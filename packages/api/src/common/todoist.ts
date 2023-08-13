import crypto from 'crypto'
import type { NextApiRequest } from 'next'
import type { Task, TodoistApi } from '@doist/todoist-api-typescript'
import { TRPCError } from '@trpc/server'

import { env, POSSIBLE_DAY_STEPS_WORDNUMBERS } from '@habitsync/lib'

const UNSAFE_ELEMENTS = ['ev', 'every', 'day', '', 'and']

export const cleanseRecurrenceString = (humanString: string) => {
	return humanString
		.toLowerCase()
		.trim()
		.split(/[, ]/)
		.filter((el) => !UNSAFE_ELEMENTS.includes(el))
}

export type CleanDoistRecurrenceString = ReturnType<
	typeof cleanseRecurrenceString
>

export const containsWordNumbers = (
	safeEl: ReturnType<typeof cleanseRecurrenceString>,
) => {
	return safeEl.some((el) => POSSIBLE_DAY_STEPS_WORDNUMBERS.includes(el))
}

export const checkIfDoist = (req: NextApiRequest) =>
	req.headers['user-agent'] === 'Todoist-Webhooks' && req.method === 'POST'

export const validateSig = async (sig: string | string[], buffer: Buffer) => {
	const hash = crypto
		.createHmac('sha256', env.DOIST_CLIENT_SECRET)
		.update(buffer)
		.digest('base64')

	return hash === sig
}

export const filterNonRecurringFromArr = (tasks: Task[]) => {
	return tasks.filter((todo) => todo.due && todo.due.isRecurring)
}

export const fetchTodosByType = async (
	inputType: 'label' | 'project',
	sourceId: string,
	doist: TodoistApi,
) => {
	let fetchedTodos
	switch (inputType) {
		case 'label':
			fetchedTodos = await doist.getTasks({ label: sourceId })
			break
		case 'project':
			fetchedTodos = await doist.getTasks({ projectId: sourceId })
			break
		default:
			fetchedTodos = null
	}
	if (!fetchedTodos) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'No tasks with the specified query found. Please check Todoist',
		})
	}

	return fetchedTodos
}

export const formatTodoistTasksForDb = (
	fetchedTodos: ReturnType<typeof fetchTodosByType>,
	taskIds: string[],
	userId: string,
) => {
	return fetchedTodos
		.filter((todo) => taskIds.includes(todo.id))
		.map((habit) => {
			const { id, content, description, labels, url, due } = habit

			if (!due?.isRecurring) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: `Task ${content} is not recurring, please repair it in Todoist`,
				})
			}

			if (!due.string) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: `Task ${content} has the recurrence string in bad format, please repair it in Todoist`,
				})
			}

			const recurrenceType = getRecurrenceType(due.string)

			const baseHabit = {
				id,
				name: content,
				description,
				labels,
				url,
				userId,
				recurrenceType,
			}

			switch (recurrenceType) {
				case 'every_x_days':
					return { ...baseHabit, recurrenceStep: getRecurrenceStep(due.string) }
				case 'specific_days':
					return {
						...baseHabit,
						recurrenceDays: getSpecificRecurrenceDays(due.string),
					}
				default:
					return baseHabit
			}
		})
}
