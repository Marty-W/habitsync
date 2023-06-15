import { createTRPCRouter, protectedProcedure } from "../trpc"

export const accRouter = createTRPCRouter({
  getUserImgUrl: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user.image
  }),
  getUserLabels: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.doist.getLabels()
  }),
})
