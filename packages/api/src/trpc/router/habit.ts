import { TRPCError } from "@trpc/server"
import { z } from "zod"

import {
  getRecurrenceStep,
  getRecurrenceType,
  getSpecificRecurrenceDays,
} from "../../common/recurrence"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const habitRouter = createTRPCRouter({
  syncWithTodoist: protectedProcedure
    .input(z.object({ labelName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const { labelName } = input

      //TODO add option to fetch tasks based on project_id, and also todoist filters

      const fetchedHabits = await ctx.doist.getTasks({
        label: labelName,
      })

      if (!fetchedHabits) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No tasks with the specified query found. Please check Todoist",
        })
      }

      //TODO diffenerentiate between initial and subsequent syncs (this wont be needed in subsequent)

      const todoistId = fetchedHabits[0].creatorId
      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          todoistId,
        },
      })

      const formattedHabitsForDb = fetchedHabits.map((habit) => {
        const { id, content, description, labels, url, due } = habit

        // TODO there should be a partial completion (filter those that don't match and still write the good ones)
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
      },
    })

    return habits
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
})
