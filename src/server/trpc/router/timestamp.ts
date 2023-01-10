import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const timestampRouter = t.router({
  getAll: authedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      const timestamps = await ctx.prisma.timestamp.findMany({
        where: {
          habitId,
        },
        orderBy: {
          time: 'asc',
        },
        select: {
          time: true,
        },
      })

      return new Set(
        timestamps.map((timestamp) => timestamp.time.toDateString())
      )
    }),
  getAllWithStreakDays: authedProcedure
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
              time: 'asc',
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
          code: 'NOT_FOUND',
          message: 'Habit not found',
        })
      }

      return new Set(
        habit.timestamps.map((timestamp) => timestamp.time.toDateString())
      )
    }),
})
