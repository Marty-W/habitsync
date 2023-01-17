import {
  getNumberOfDaysInInterval,
  getNumberOfTimestampsInInterval,
  getSuccessRate,
} from '@/server/common/recurrence'
import { TRPCError } from '@trpc/server'
import { startOfDay } from 'date-fns'
import { Weekday } from 'types'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'
// TODO Check if there is a possibility to make sure these are in date format (or simply use date?)

export const statsRouter = t.router({
  getTotalHabitCompletions: authedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      return await ctx.prisma.timestamp.count({
        where: {
          habitId,
        },
      })
    }),
  getHabitSuccessRate: authedProcedure
    .input(
      z.object({
        habitId: z.string(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      const habit = await ctx.prisma.habit.findUnique({
        where: {
          id: habitId,
        },
        select: {
          timestamps: true,
          createdAt: true,
          recurrenceType: true,
          recurrenceStep: true,
          recurrenceDays: true,
        },
      })

      if (!habit) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Habit not found',
        })
      }

      const interval = {
        start: input.startDate
          ? startOfDay(new Date(input.startDate))
          : startOfDay(habit.createdAt),
        end: input.endDate ? startOfDay(new Date(input.endDate)) : startOfDay(new Date()),
      }

      const numOfDaysInInterval = getNumberOfDaysInInterval(interval, habit.recurrenceType, {
        step: habit.recurrenceStep || undefined,
        days: habit.recurrenceDays as Weekday[],
      })
      //FIX rewrite the type casts

      const numOfTimestampsInInterval = getNumberOfTimestampsInInterval(habit.timestamps, interval)

      return getSuccessRate(numOfTimestampsInInterval, numOfDaysInInterval)
    }),
})
