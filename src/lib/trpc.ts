import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { NextPageContext } from 'next'
import superjson from 'superjson'
import type { AppRouter } from 'server/trpc/router'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url (its automatically populated by vercel),
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export interface SSRContext extends NextPageContext {
  status?: number
}

export const trpc = createTRPCNext<AppRouter, SSRContext>({
  config({ ctx }) {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (ctx?.req) {
              //eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { connection: _connection, ...headers } = ctx.req.headers

              return {
                ...headers,
                'x-ssr': '1',
              }
            }
            return {}
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus:
              process.env.NODE_ENV === 'development' ? false : true,
          },
        },
      },
    }
  },
  ssr: true,
  responseMeta(opts) {
    const ctx = opts.ctx as SSRContext

    if (ctx.status) {
      return {
        status: ctx.status,
      }
    }

    const error = opts.clientErrors[0]

    if (error) {
      return {
        status: error.data?.httpStatus ?? 500,
      }
    }

    return {}
  },
})

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
