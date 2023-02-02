import { NextApiRequest, NextApiResponse } from 'next'
import { createContext } from 'server/trpc/context'
import { appRouter } from '@/server/trpc/router'
import { DoistWebhookReqBodyShape } from 'types'
import crypto from 'crypto'
import { env } from 'env/server.mjs'

const validateHeaders = (req: NextApiRequest) => {
    const isAllowedMethod = req.method === 'POST'
    const isFromDoist = req.headers['user-agent'] === 'Todoist-Webhooks'
    const todoistHash = req.headers['x-todoist-hmac-sha256']

    const hash = crypto
        .createHmac('sha256', env.DOIST_CLIENT_SECRET)
        .update(JSON.stringify(req.body))
        .digest('base64')

    return isAllowedMethod && isFromDoist && hash === todoistHash
}

const addHabitTimestampHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const isValid = validateHeaders(req)

    if (!isValid) {
        return res.status(405).json({ message: 'Not allowed' })
    }

    const ctx = await createContext({ req, res })
    const caller = appRouter.createCaller(ctx)

    const parsedBody = DoistWebhookReqBodyShape.safeParse(JSON.parse(req.body))

    if (!parsedBody.success) {
        return res.status(200).json({ message: 'Invalid request body', error: parsedBody.error })
    }

    const { event_data } = parsedBody.data

    try {
        await caller.timestamp.add({
            habitId: event_data.id,
        })

        res.status(200).json({ message: 'Success' })
    } catch (e) {
        console.error(e)
        res.status(200).json({ message: 'Resource not found in database' })
    }
}

export default addHabitTimestampHandler
