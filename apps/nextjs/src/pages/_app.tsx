import type { AppType } from "next/app"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import ThemeProvider from "~/components/themeProvider"
import { api } from "../utils/trpc"

import "../styles/globals.css"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools />
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
