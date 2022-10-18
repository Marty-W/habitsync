// src/server/router/context.ts
import { TodoistApi } from '@doist/todoist-api-typescript'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { Session } from 'next-auth'
import { getServerAuthSession } from '../common/get-server-auth-session'
import { prisma } from '../db/client'

const createDoistApi = (token: string) => {
  return new TodoistApi(token)
}

type CreateContextOptions = {
  session: Session | null
  doist: TodoistApi
}

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    doist: opts.doist,
    prisma,
  }
}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { req, res } = opts

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res })

  // Doist API, right now hardcoded to my token
  const doist = createDoistApi('3c0da19dbf300d5fb8bc154caf25d70d6806c26f')

  return await createContextInner({
    session,
    doist,
  })
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
