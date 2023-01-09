import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

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
})
