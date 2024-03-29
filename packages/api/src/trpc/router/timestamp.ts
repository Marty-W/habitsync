import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { getUniqueStringDates, normalizeDate } from '@habitsync/lib/src/date'
import type { Weekday } from '@habitsync/lib/src/types'

import { getHabitRecurrenceAndTimestamps } from '../../common/prisma'
import {
	getExtraStreakDaysForSpecificDays,
	getExtraStreakDaysForStepDays,
	getExtraStreakDaysForWorkdays,
} from '../../common/streaks'
import {
	groupTimestamps,
	transformTimestampsToChartData,
} from '../../common/timestamps'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const timestampRouter = createTRPCRouter({
	getAll: protectedProcedure
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

			return new Set(
				timestamps.map((timestamp) => timestamp.time.toDateString()),
			)
		}),
	getAllWithStreakDays: protectedProcedure
		.input(z.object({ habitId: z.string() }))
		.query(async ({ ctx, input }) => {
			const { habitId } = input

			const habit = await getHabitRecurrenceAndTimestamps(ctx.prisma, habitId)

			const normalizedTimestamps = new Set(
				habit.timestamps.map((timestamp) => normalizeDate(timestamp.time)),
			)
			const timestampsOnly = habit.timestamps.map((timestamp) => timestamp.time)

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
					extraStreakDays: new Set(
						getExtraStreakDaysForWorkdays(timestampsOnly),
					),
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
	getSummaryCounts: protectedProcedure
		.input(z.object({ habitId: z.string() }))
		.query(async ({ ctx, input }) => {
			const { habitId } = input

			const habit = await getHabitRecurrenceAndTimestamps(ctx.prisma, habitId)

			//Get rid of duplicates and normalize
			const uniqueStringDates = getUniqueStringDates(
				habit.timestamps.map((timestamp) => timestamp.time),
			)

			const groupedTimestamps = groupTimestamps(uniqueStringDates)

			return transformTimestampsToChartData(groupedTimestamps)
		}),
	deleteMany: protectedProcedure
		.input(z.object({ habitIds: z.array(z.string()) }))
		.mutation(async ({ ctx, input }) => {
			const { habitIds } = input

			const timestamps = await ctx.prisma.timestamp.deleteMany({
				where: {
					habitId: {
						in: habitIds,
					},
				},
			})

			return {
				deletedCount: timestamps.count,
				status: 'ok',
			}
		}),
})
