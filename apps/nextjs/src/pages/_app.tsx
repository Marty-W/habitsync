import type { AppType } from "next/app"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { api } from "../utils/trpc"

import "../styles/globals.css"

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

export default api.withTRPC(MyApp)
