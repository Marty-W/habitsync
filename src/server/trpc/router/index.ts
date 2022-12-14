// src/server/trpc/router/index.ts
import { t } from '../trpc'
import { accRouter } from './acc'
import { authRouter } from './auth'
import { habitRouter } from './habit'
import { streakRouter } from './streak'
import { timestampRouter } from './timestamp'
import { statsRouter } from './stats'

export const appRouter = t.router({
  auth: authRouter,
  acc: accRouter,
  habit: habitRouter,
  timestamp: timestampRouter,
  streak: streakRouter,
  stats: statsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
