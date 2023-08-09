import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const accRouter = createTRPCRouter({
	getUserImgUrl: protectedProcedure.query(({ ctx }) => {
		return ctx.session.user.image
	}),
	getUserLabels: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.doist.getLabels()
	}),
	getUserProjects: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.doist.getProjects()
	}),
	deleteAcc: protectedProcedure.mutation(async ({ ctx }) => {
		const { prisma, session } = ctx

		try {
			const deleteUser = await prisma.user.delete({
				where: {
					id: session.user.id,
				},
			})

			return {
				status: 'ok',
				deletedUser: deleteUser,
			}
		} catch (error) {
			if (error instanceof TRPCError) {
				throw new TRPCError({
					code: error.code,
					message: error.message,
				})
			}
			return {
				status: 'error',
				error,
			}
		}
	}),
})
