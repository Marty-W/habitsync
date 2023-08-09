import Google from '@auth/core/providers/google'
import type { DefaultSession } from '@auth/core/types'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@habitSync/db'
import NextAuth from 'next-auth'

import { env } from '@habitsync/lib'

export type { Session } from 'next-auth'

// Update this whenever adding new providers so that the client can
export const providers = ['google'] as const
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
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
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

		// @TODO - if you wanna have auth on the edge
		// jwt: ({ token, profile }) => {
		//   if (profile?.id) {
		//     token.id = profile.id;
		//     token.image = profile.picture;
		//   }
		//   return token;
		// },

		// @TODO
		// authorized({ request, auth }) {
		//   return !!auth?.user
		// }
	},
})
