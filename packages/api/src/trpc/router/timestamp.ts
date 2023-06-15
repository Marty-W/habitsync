import { getUniqueStringDates, normalizeDate } from "@habitsync/lib/src/date"
import { type Weekday } from "@habitsync/lib/src/types"
import { TRPCError } from "@trpc/server"
import { format, startOfMonth, startOfWeek, startOfYear } from "date-fns"
import { z } from "zod"

import {
  getExtraStreakDaysForSpecificDays,
  getExtraStreakDaysForStepDays,
  getExtraStreakDaysForWorkdays,
} from "../../common/streaks"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const timestampRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      const timestamps = await ctx.prisma.timestamp.findMany({
        where: {
          habitId,
        },
        orderBy: {
          time: "asc",
        },
        select: {
          time: true,
        },
      })

      return new Set(
        timestamps.map((timestamp) => timestamp.time.toDateString()),
      )
    }),
  getAllWithStreakDays: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      const habit = await ctx.prisma.habit.findUnique({
        where: {
          id: habitId,
        },
        select: {
          timestamps: {
            orderBy: {
              time: "asc",
            },
            select: {
              time: true,
            },
          },
          recurrenceType: true,
          recurrenceStep: true,
          recurrenceDays: true,
        },
      })

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Habit not found",
        })
      }

      const normalizedTimestamps = new Set(
        habit.timestamps.map((timestamp) => normalizeDate(timestamp.time)),
      )
      const timestampsOnly = habit.timestamps.map((timestamp) => timestamp.time)

      if (habit.recurrenceType === "every_x_days") {
        if (!habit.recurrenceStep) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Recurrence step wasn't provided",
          })
        }
        // FIX: generalize getExtraStreakDaysFor...
        return {
          timestamps: normalizedTimestamps,
          extraStreakDays: new Set(
            getExtraStreakDaysForStepDays(timestampsOnly, habit.recurrenceStep),
          ),
        }
      }

      if (habit.recurrenceType === "every_workday") {
        return {
          timestamps: normalizedTimestamps,
          extraStreakDays: new Set(
            getExtraStreakDaysForWorkdays(timestampsOnly),
          ),
        }
      }
      if (habit.recurrenceType === "specific_days") {
        if (!habit.recurrenceDays) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Recurrence days weren't provided",
          })
        }
        return {
          timestamps: normalizedTimestamps,
          extraStreakDays: new Set(
            getExtraStreakDaysForSpecificDays(
              timestampsOnly,
              habit.recurrenceDays as Weekday[],
            ),
          ),
        }
      }

      return {
        timestamps: normalizedTimestamps,
      }
    }),
  getSummaryCounts: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      const habit = await ctx.prisma.habit.findUnique({
        where: {
          id: habitId,
        },
        select: {
          timestamps: {
            orderBy: {
              time: "asc",
            },
            select: {
              time: true,
            },
          },
          recurrenceType: true,
          recurrenceStep: true,
          recurrenceDays: true,
        },
      })

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Habit not found",
        })
      }

      //Get rid of duplicates and normalize
      const uniqueStringDates = getUniqueStringDates(
        habit.timestamps.map((timestamp) => timestamp.time),
      )

      // Group timestamps by week, month, and year
      const groupedByWeek: Record<string, number> = {}
      const groupedByMonth: Record<string, number> = {}
      const groupedByYear: Record<string, number> = {}

      uniqueStringDates.forEach((timestamp) => {
        //FIX: now the start of week is set to Monday, maybe it would be worth it to send locale from the client as input
        const weekKey = format(
          startOfWeek(new Date(timestamp), { weekStartsOn: 1 }),
          "yyyy-MM-dd",
        )
        const monthKey = format(startOfMonth(new Date(timestamp)), "yyyy-MM")
        const yearKey = format(startOfYear(new Date(timestamp)), "yyyy")

        groupedByWeek[weekKey] = (groupedByWeek[weekKey] || 0) + 1
        groupedByMonth[monthKey] = (groupedByMonth[monthKey] || 0) + 1
        groupedByYear[yearKey] = (groupedByYear[yearKey] || 0) + 1
      })

      return {
        groupedByWeek,
        groupedByMonth,
        groupedByYear,
      }
    }),
})
