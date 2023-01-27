// src/pages/_app.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/app'
import { trpc } from 'lib/trpc'
import '../styles/globals.css'

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
        </SessionProvider>
    )
}

export default trpc.withTRPC(MyApp)
