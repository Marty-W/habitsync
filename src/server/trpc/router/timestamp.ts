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
})
