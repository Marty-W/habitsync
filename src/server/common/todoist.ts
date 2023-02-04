import { POSSIBLE_DAY_STEPS_WORDNUMBERS } from '@/lib/const'
import { NextApiRequest } from 'next'
import { env } from 'env/server.mjs'
import crypto from 'crypto'

const UNSAFE_ELEMENTS = ['ev', 'every', 'day', '', 'and']

export const cleanseRecurrenceString = (humanString: string) => {
    return humanString
        .toLowerCase()
        .trim()
        .split(/[, ]/)
        .filter(el => !UNSAFE_ELEMENTS.includes(el))
}

export const containsWordNumbers = (safeEl: ReturnType<typeof cleanseRecurrenceString>) => {
    return safeEl.some(el => POSSIBLE_DAY_STEPS_WORDNUMBERS.includes(el))
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
