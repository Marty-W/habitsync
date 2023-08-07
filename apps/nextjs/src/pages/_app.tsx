import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps, AppType } from "next/app"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import ThemeProvider from "~/components/themeProvider"
import { api } from "../utils/trpc"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools />
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
