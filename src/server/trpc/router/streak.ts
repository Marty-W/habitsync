import { z } from 'zod'
import {
  calculateAllStreaks,
  calculateCurrentStreak,
} from 'server/common/streaks'
import { authedProcedure, t } from '../trpc'
import { TRPCError } from '@trpc/server'

export const streakRouter = t.router({
  getCurrent: authedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      const habit = await ctx.prisma.habit.findUnique({
        where: {
          id: habitId,
        },
        include: {
          timestamps: {
            orderBy: {
              time: 'desc',
            },
            select: {
              time: true,
            },
          },
        },
      })

      if (!habit) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Habit not found',
        })
      }

      return calculateCurrentStreak(
        habit.timestamps.map((timestamp) => timestamp.time)
      )
    }),
  getBest: authedProcedure
    .input(z.object({ habitId: z.string(), numStreaks: z.number() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      const timestamps = await ctx.prisma.timestamp.findMany({
        where: {
          habitId,
        },
        orderBy: {
          time: 'desc',
        },
        select: {
          time: true,
        },
      })

      return calculateAllStreaks(
        timestamps.map((timestamp) => timestamp.time)
      ).slice(0, input.numStreaks)
    }),
})
