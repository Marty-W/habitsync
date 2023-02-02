import { normalizeDate } from '@/lib/date'
import {
    getExtraStreakDaysForStepDays,
    getExtraStreakDaysForWorkdays,
    getExtraStreakDaysForSpecificDays,
} from '@/server/common/streaks'
import { TRPCError } from '@trpc/server'
import { Weekday } from 'types'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const timestampRouter = t.router({
    getAll: authedProcedure
        .input(z.object({ habitId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { habitId } = input

            const timestamps = await ctx.prisma.timestamp.findMany({
                where: {
                    habitId,
                },
                orderBy: {
                    time: 'asc',
                },
                select: {
                    time: true,
                },
            })

            return new Set(timestamps.map(timestamp => timestamp.time.toDateString()))
        }),
    getAllWithStreakDays: authedProcedure
        .input(z.object({ habitId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { habitId } = input

            const habit = await ctx.prisma.habit.findUnique({
                where: {
                    id: habitId,
                },
                select: {
                    timestamps: {
                        orderBy: {
                            time: 'asc',
                        },
                        select: {
                            time: true,
                        },
                    },
                    recurrenceType: true,
                    recurrenceStep: true,
                    recurrenceDays: true,
                },
            })

            if (!habit) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Habit not found',
                })
            }

            const normalizedTimestamps = new Set(
                habit.timestamps.map(timestamp => normalizeDate(timestamp.time)),
            )
            const timestampsOnly = habit.timestamps.map(timestamp => timestamp.time)

            if (habit.recurrenceType === 'every_x_days') {
                if (!habit.recurrenceStep) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: "Recurrence step wasn't provided",
                    })
                }
                return {
                    timestamps: normalizedTimestamps,
                    extraStreakDays: new Set(
                        getExtraStreakDaysForStepDays(timestampsOnly, habit.recurrenceStep),
                    ),
                }
            }

            if (habit.recurrenceType === 'every_workday') {
                return {
                    timestamps: normalizedTimestamps,
                    extraStreakDays: new Set(getExtraStreakDaysForWorkdays(timestampsOnly)),
                }
            }
            if (habit.recurrenceType === 'specific_days') {
                if (!habit.recurrenceDays) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: "Recurrence days weren't provided",
                    })
                }
                return {
                    timestamps: normalizedTimestamps,
                    extraStreakDays: new Set(
                        getExtraStreakDaysForSpecificDays(
                            timestampsOnly,
                            habit.recurrenceDays as Weekday[],
                        ),
                    ),
                }
            }

            return {
                timestamps: normalizedTimestamps,
            }
        }),
    add: t.procedure.input(z.object({ habitId: z.string() })).mutation(async ({ ctx, input }) => {
        const { habitId } = input

        const habit = await ctx.prisma.habit.findUnique({
            where: {
                id: habitId,
            },
        })

        if (!habit) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Habit not found',
            })
        }

        const timestamp = await ctx.prisma.timestamp.create({
            data: {
                habitId,
            },
        })

        return timestamp
    }),
})
