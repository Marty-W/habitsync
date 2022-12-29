import { z } from 'zod'
import { calculateAllStreaks, calculateCurrentStreak } from '@lib/date'
import { authedProcedure, t } from '../trpc'

export const streakRouter = t.router({
  getCurrent: authedProcedure
    .input(z.object({ habitId: z.string() }))
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

      return calculateCurrentStreak(
        timestamps.map((timestamp) => timestamp.time)
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

      //TODO pagination ????
      //https://github.com/trpc/examples-next-prisma-starter/blob/main/src/server/routers/post.ts

      return calculateAllStreaks(
        timestamps.map((timestamp) => timestamp.time)
      ).slice(0, input.numStreaks)
    }),
})
