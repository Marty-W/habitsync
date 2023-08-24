import Todoist from '@auth/core/providers/todoist'
import type { DefaultSession } from '@auth/core/types'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import { prisma } from '@habitsync/db'
import { env } from '@habitsync/lib'

export type { Session } from 'next-auth'

// Update this whenever adding new providers so that the client can
export const providers = ['todoist'] as const
export type OAuthProviders = (typeof providers)[number]

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
		} & DefaultSession['user']
	}
}

export const {
	handlers: { GET, POST },
	auth,
	CSRF_experimental,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Todoist({
			clientId: env.DOIST_CLIENT_ID,
			clientSecret: env.DOIST_CLIENT_SECRET,
			issuer: 'https://todoist.com/oauth/authorize',
		}),
	],
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
	},
})
