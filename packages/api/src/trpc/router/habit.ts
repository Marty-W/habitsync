import { TRPCError } from "@trpc/server"
import { z } from "zod"

import {
  getRecurrenceStep,
  getRecurrenceType,
  getSpecificRecurrenceDays,
} from "../../common/recurrence"
import { filterNonRecurringFromArr } from "../../common/todoist"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const habitRouter = createTRPCRouter({
  syncWithTodoist: protectedProcedure
    .input(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal("label"),
          sourceId: z.string(),
          taskIds: z.array(z.string()),
        }),
        z.object({
          type: z.literal("project"),
          sourceId: z.string(),
          taskIds: z.array(z.string()),
        }),
      ]),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const { sourceId, taskIds } = input
      let fetchedTodos

      if (input.type === "label") {
        fetchedTodos = await ctx.doist.getTasks({
          label: sourceId,
        })
      }

      if (input.type === "project") {
        fetchedTodos = await ctx.doist.getTasks({
          projectId: sourceId,
        })
      }

      if (!fetchedTodos) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No tasks with the specified query found. Please check Todoist",
        })
      }

      const todoistId = fetchedTodos[0].creatorId
      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          todoistId,
        },
      })

      const filteredSelected = fetchedTodos.filter((todo) =>
        taskIds.includes(todo.id),
      )

      const formattedHabitsForDb = filteredSelected.map((habit) => {
        const { id, content, description, labels, url, due } = habit

        if (!due || !due.isRecurring) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Task ${content} is not recurring, please repair it in Todoist`,
          })
        }

        if (!due.string) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Task ${content} has the recurrence string in bad format, please repair it in Todoist`,
          })
        }

        const recurrenceType = getRecurrenceType(due.string)

        const baseHabit = {
          id,
          name: content,
          description,
          labels,
          url,
          userId,
          recurrenceType,
        }

        if (recurrenceType === "every_x_days") {
          const step = getRecurrenceStep(due.string)

          return {
            ...baseHabit,
            recurrenceStep: step,
          }
        }

        if (recurrenceType === "specific_days") {
          const days = getSpecificRecurrenceDays(due.string)

          return {
            ...baseHabit,
            recurrenceDays: days,
          }
        }

        return baseHabit
      })

      await ctx.prisma.habit.createMany({
        data: formattedHabitsForDb,
        skipDuplicates: true,
      })

      return {
        status: "ok",
        numberOfHabitsCreated: formattedHabitsForDb.length,
      }
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id

    const habits = await ctx.prisma.habit.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        labels: true,
        name: true,
        projectId: true,
        timestamps: true,
      },
    })

    if (!habits.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No habits found. Please sync with Todoist first.`,
      })
    }

    return habits.map((habit) => ({
      id: habit.id,
      labels: habit.labels,
      name: habit.name,
      projectId: habit.projectId,
      numOfTimestamps: habit.timestamps.length,
    }))
  }),
  getDetail: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const habit = await ctx.prisma.habit.findUnique({
        where: {
          id,
        },
        select: {
          description: true,
          labels: true,
          name: true,
          url: true,
          createdAt: true,
          recurrenceType: true,
          recurrenceDays: true,
          recurrenceStep: true,
        },
      })

      if (!habit) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Habit with id ${id} not found`,
        })
      }

      return habit
    }),
  getNewTasksFromTodoist: protectedProcedure
    .input(
      z.discriminatedUnion("type", [
        z.object({ type: z.literal("label"), id: z.string() }),
        z.object({ type: z.literal("project"), id: z.string() }),
      ]),
    )
    .query(async ({ ctx, input }) => {
      let fetchedTodos
      const { type, id } = input

      if (type === "label") {
        fetchedTodos = await ctx.doist.getTasks({
          label: id,
        })
      }

      if (type === "project") {
        fetchedTodos = await ctx.doist.getTasks({
          projectId: id,
        })
      }

      if (!fetchedTodos) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No tasks with the specified query found. Please check Todoist.",
        })
      }

      const onlyRecurring = filterNonRecurringFromArr(fetchedTodos)

      if (onlyRecurring.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No recurring tasks found. Please check Todoist or pick a different label.",
        })
      }

      const alreadySyncedIds = await ctx.prisma.habit
        .findMany({
          where: {
            userId: ctx.session?.user?.id,
          },
        })
        .then((habits) => habits.map((habit) => habit.id))

      return onlyRecurring
        .filter((todo) => !alreadySyncedIds.includes(todo.id))
        .map((todo) => {
          return {
            id: todo.id,
            name: todo.content,
            labels: todo.labels,
            projectId: todo.projectId,
            recurrence: todo.due?.string,
          }
        })
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const { ids } = input

      const habits = await ctx.prisma.habit.findMany({
        where: {
          id: {
            in: ids,
          },
          userId,
        },
      })

      if (habits.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `No habits with the specified ids found`,
        })
      }

      await ctx.prisma.habit.deleteMany({
        where: {
          id: {
            in: ids,
          },
          userId,
        },
      })

      return {
        status: "ok",
        numberOfHabitsDeleted: habits.length,
      }
    }),
})
