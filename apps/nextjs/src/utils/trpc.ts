import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '@habitsync/api'

export const api = createTRPCReact<AppRouter>()

export { type RouterInputs, type RouterOutputs } from '@habitsync/api'
