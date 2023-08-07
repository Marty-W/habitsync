import type { AppRouter } from "@habitsync/api"
import { createTRPCReact } from "@trpc/react-query"

export const api = createTRPCReact<AppRouter>()

export { type RouterInputs, type RouterOutputs } from "@habitsync/api"
