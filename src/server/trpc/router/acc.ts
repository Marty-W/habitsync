import { authedProcedure, t } from '../trpc'

export const accRouter = t.router({
    getUserImgUrl: authedProcedure.query(({ ctx }) => {
        return ctx.session.user.image
    }),
    getUserLabels: authedProcedure.query(async ({ ctx }) => {
        return await ctx.doist.getLabels()
    }),
})
