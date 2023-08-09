import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const syncRouter = createTRPCRouter({
	// syncByLabel: protectedProcedure
	// .input(z.object({labelId: z.string()}))
	// .mutation(async ({ctx, input}) => {
	//     const userId = ctx.session?.user?.id
	//     const {labelId} = input
	//
	//     const fetchedHabits
	// }))
})
