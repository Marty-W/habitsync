import { z } from 'zod'
import { calculateAllStreaks, calculateCurrentStreak } from '../../../lib/date'
import { authedProcedure, t } from '../trpc'

export const timestampRouter = t.router({
  getAllTimestamps: authedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      try {
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
      } catch (err) {
        console.error(err)
      }
    }),
  getCurrentStreak: authedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      try {
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

        return calculateCurrentStreak(
          timestamps.map((timestamp) => timestamp.time)
        )
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }),
  getBestStreaks: authedProcedure
    .input(z.object({ habitId: z.string(), numStreaks: z.number() }))
    .query(async ({ ctx, input }) => {
      const { habitId } = input

      try {
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

        //TODO pagination ????

        return calculateAllStreaks(
          timestamps.map((timestamp) => timestamp.time)
        ).slice(0, input.numStreaks)
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }),
})