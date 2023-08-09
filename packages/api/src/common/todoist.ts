import crypto from 'crypto'
import { type NextApiRequest } from 'next'
import { type Task } from '@doist/todoist-api-typescript'

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
