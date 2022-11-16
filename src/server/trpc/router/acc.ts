import { t } from '../trpc'

export const accRouter = t.router({
  getUserImgUrl: t.procedure.query(({ ctx }) => {
    return ctx.session?.user?.image
  }),
  getUserLabels: t.procedure.query(async ({ ctx }) => {
    return await ctx.doist.getLabels()
  }),
})
