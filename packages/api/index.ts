import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"

import { type AppRouter } from "./src/trpc/root"

export { appRouter, type AppRouter } from "./src/trpc/root"
export { createContext, createContextInner } from "./src/trpc/trpc"
export { t, protectedProcedure } from "./src/trpc/trpc"

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
