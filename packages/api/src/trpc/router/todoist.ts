import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import {
	fetchTodosByType,
	filterNonRecurringFromArr,
	formatTodoistTasksForDb,
} from '../../common/todoist'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const todoistRouter = createTRPCRouter({
	getUserLabels: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.doist.getLabels()
	}),
	getUserProjects: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.doist.getProjects()
	}),
	syncWithTodoist: protectedProcedure
		.input(
			z.discriminatedUnion('type', [
				z.object({
					type: z.literal('label'),
					sourceId: z.string(),
					taskIds: z.array(z.string()),
				}),
				z.object({
					type: z.literal('project'),
					sourceId: z.string(),
					taskIds: z.array(z.string()),
				}),
			]),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session?.user?.id
			const doist = ctx.doist
			const { sourceId, taskIds } = input

			const fetchedTodos = await fetchTodosByType(input.type, sourceId, doist)

			const todoistId = fetchedTodos[0]?.creatorId
			await ctx.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					todoistId,
				},
			})

			const userSelected = fetchedTodos.filter((todo) =>
				taskIds.includes(todo.id),
			)

			if (userSelected.length === 0) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message:
						'No tasks with the specified query found. Please check Todoist',
				})
			}

			const formattedHabitsForDb = formatTodoistTasksForDb(
				userSelected,
				taskIds,
				userId,
			)

			await ctx.prisma.habit.createMany({
				data: formattedHabitsForDb,
				skipDuplicates: true,
			})

			return {
				status: 'ok',
				numberOfHabitsCreated: formattedHabitsForDb.length,
			}
		}),
	getNewTasksFromTodoist: protectedProcedure
		.input(
			z.discriminatedUnion('type', [
				z.object({ type: z.literal('label'), id: z.string() }),
				z.object({ type: z.literal('project'), id: z.string() }),
			]),
		)
		.query(async ({ ctx, input }) => {
			const { type, id } = input

			const fetchedTodos = await fetchTodosByType(type, id, ctx.doist)

			const onlyRecurring = filterNonRecurringFromArr(fetchedTodos)

			if (onlyRecurring.length === 0) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message:
						'No recurring tasks found. Please check Todoist or pick a different label.',
				})
			}

			const alreadySyncedIds = await ctx.prisma.habit
				.findMany({
					where: {
						userId: ctx.session?.user?.id,
					},
				})
				.then((habits) => habits.map((habit) => habit.id))

			return onlyRecurring
				.filter((todo) => !alreadySyncedIds.includes(todo.id))
				.map((todo) => {
					return {
						id: todo.id,
						name: todo.content,
						labels: todo.labels,
						projectId: todo.projectId,
						recurrence: todo.due?.string,
					}
				})
		}),
})
