import { z } from 'zod'
import { calculateAllStreaks, calculateCurrentStreak } from 'server/common/streaks'
import { authedProcedure, t } from '../trpc'
import { TRPCError } from '@trpc/server'
import { Weekday } from 'types'

export const streakRouter = t.router({
    getCurrent: authedProcedure
        .input(z.object({ habitId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { habitId } = input

            const habit = await ctx.prisma.habit.findUnique({
                where: {
                    id: habitId,
                },
                include: {
                    timestamps: {
                        orderBy: {
                            time: 'desc',
                        },
                        select: {
                            time: true,
                        },
                    },
                },
            })

            if (!habit) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Habit not found',
                })
            }

            return calculateCurrentStreak(habit.timestamps.map(timestamp => timestamp.time))
        }),
    getBest: authedProcedure
        .input(z.object({ habitId: z.string(), numStreaks: z.number() }))
        .query(async ({ ctx, input }) => {
            const { habitId } = input

            const habit = await ctx.prisma.habit.findUnique({
                where: {
                    id: habitId,
                },
                select: {
                    timestamps: {
                        orderBy: {
                            time: 'desc',
                        },
                        select: {
                            time: true,
                        },
                    },
                    recurrenceDays: true,
                    recurrenceStep: true,
                    recurrenceType: true,
                },
            })

            if (!habit || !habit.recurrenceType) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Habit not found',
                })
            }
            if (habit.recurrenceType === 'every_x_days' && !habit.recurrenceStep) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Habit is set to repeat every x days, but no recurrence step is set',
                })
            }
            if (habit.recurrenceType === 'specific_days' && !habit.recurrenceDays) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Habit is set to repeat on specific days, but they are no set',
                })
            }

            //FIX rewrite the type casts
            return calculateAllStreaks(
                habit.timestamps.map(timestamp => timestamp.time),
                {
                    type: habit.recurrenceType,
                    days: habit.recurrenceDays as Weekday[],
                    step: habit.recurrenceStep!,
                },
            ).slice(0, input.numStreaks)
        }),
})
