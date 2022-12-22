// src/server/trpc/router/index.ts
import { t } from '../trpc'
import { accRouter } from './acc'
import { authRouter } from './auth'
import { habitRouter } from './habit'
import { streakRouter } from './streak'
import { timestampRouter } from './timestamp'

export const appRouter = t.router({
  auth: authRouter,
  acc: accRouter,
  habit: habitRouter,
  timestamp: timestampRouter,
  streak: streakRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
