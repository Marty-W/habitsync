import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { getHabitDetail } from '../../common/prisma'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const habitRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session?.user?.id

		const habits = await ctx.prisma.habit.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				labels: true,
				name: true,
				projectId: true,
				timestamps: true,
			},
		})

		if (!habits.length) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `No habits found. Please sync with Todoist first.`,
			})
		}

		return habits.map((habit) => ({
			id: habit.id,
			labels: habit.labels,
			name: habit.name,
			projectId: habit.projectId,
			numOfTimestamps: habit.timestamps.length,
		}))
	}),
	getDetail: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const { id } = input

			return await getHabitDetail(ctx.prisma, id)
		}),
	deleteMany: protectedProcedure
		.input(z.object({ ids: z.array(z.string()) }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session?.user?.id
			const { ids } = input

			const habits = await ctx.prisma.habit.findMany({
				where: {
					id: {
						in: ids,
					},
					userId,
				},
			})

			if (habits.length === 0) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: `No habits with the specified ids found`,
				})
			}

			await ctx.prisma.habit.deleteMany({
				where: {
					id: {
						in: ids,
					},
					userId,
				},
			})

			return {
				status: 'ok',
				numberOfHabitsDeleted: habits.length,
			}
		}),
})
