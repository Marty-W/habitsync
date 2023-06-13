import { TodoistApi } from '@doist/todoist-api-typescript'
import { getServerSession, type Session } from '@habitsync/auth'
import { prisma } from '@habitsync/db'
import { env } from '@habitsync/lib/'
import { initTRPC, TRPCError } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import superjson from 'superjson'
import { ZodError } from 'zod'

// CONTEXT
const createDoistApi = (token: string) => {
    return new TodoistApi(token)
}

type CreateContextOptions = {
    session: Session | null
    doist: TodoistApi
}

export const createContextInner = (opts: CreateContextOptions) => {
    return {
        session: opts.session,
        doist: opts.doist,
        prisma,
    }
}

export const createContext = async (opts: CreateNextContextOptions) => {
    const { req, res } = opts

    // Get the session from the server using the unstable_getServerSession wrapper function
    const session = await getServerSession({ req, res })

    //FIX Get token??
    // Doist API, right now hardcoded to my token
    const doist = createDoistApi(env.DOIST_TEMP_API_TOKEN)

    return createContextInner({
        session,
        doist,
    })
}

// INITIALIZATION

export const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        }
    },
})

// ROUTER & PROCEDURES

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next({
        ctx: {
            ...ctx,
            // infers that `session` is non-nullable to downstream resolvers
            session: { ...ctx.session, user: ctx.session.user },
        },
    })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
