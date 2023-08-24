import { TodoistApi } from '@doist/todoist-api-typescript'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { auth } from '@habitsync/auth'
import type { Session } from '@habitsync/auth'
import { prisma } from '@habitsync/db'

// CONTEXT
const createDoistApi = (token: string) => {
	return new TodoistApi(token)
}

interface CreateContextOptions {
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

export const createContext = async (opts: {
	req?: Request
	auth?: Session
}) => {
	const session = opts.auth ?? (await auth())
	const source = opts.req?.headers.get('x-trpc-source') ?? 'unknown'

	console.log('>>> tRPC Request from', source, 'by', session?.user)

	const userId = session.user.id

	// Fetch the account from the database
	const account = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			accounts: true,
		},
	})

	const doist = createDoistApi(account?.accounts[0]?.access_token ?? '')

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
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
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
