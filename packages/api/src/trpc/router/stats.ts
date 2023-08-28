import { TRPCError } from '@trpc/server'
import { eachDayOfInterval, endOfYesterday, startOfDay } from 'date-fns'
import { z } from 'zod'

import { normalizeDate } from '@habitsync/lib'
import type { Weekday } from '@habitsync/lib/src/types'

import { getHabitRecurrenceAndTimestamps } from '../../common/prisma'
import {
	calculateSmoothingForRecurrence,
	getNumberOfDaysInInterval,
	getNumberOfTimestampsInInterval,
	getSuccessRate,
} from '../../common/recurrence'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const statsRouter = createTRPCRouter({
	getTotalHabitCompletions: protectedProcedure
		.input(z.object({ habitId: z.string() }))
		.query(async ({ ctx, input }): Promise<number> => {
			const { habitId } = input

			const totalCount = await ctx.prisma.timestamp.count({
				where: {
					habitId,
				},
			})

			return totalCount || 0
		}),
	getHabitSuccessRate: protectedProcedure
		.input(
			z.object({
				habitId: z.string(),
				startDate: z.string().optional(),
				endDate: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { habitId } = input

			const habit = await getHabitRecurrenceAndTimestamps(ctx.prisma, habitId)

			const interval = {
				start: input.startDate
					? startOfDay(new Date(input.startDate))
					: startOfDay(habit.createdAt),
				end: input.endDate
					? startOfDay(new Date(input.endDate))
					: startOfDay(new Date()),
			}

			const numOfDaysInInterval = getNumberOfDaysInInterval(interval, {
				days: habit.recurrenceDays as Weekday[],
				step: habit.recurrenceStep!,
				type: habit.recurrenceType,
			})

			const numOfTimestampsInInterval = getNumberOfTimestampsInInterval(
				habit.timestamps,
				interval,
			)

			return getSuccessRate(numOfTimestampsInInterval, numOfDaysInInterval)
		}),
	getExpSmoothingSuccessRate: protectedProcedure
		.input(
			z.object({
				habitId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { habitId } = input

			const habit = await getHabitRecurrenceAndTimestamps(ctx.prisma, habitId)
			const completionDates = habit.timestamps.map((timestamp) =>
				normalizeDate(timestamp.time),
			)

			if (completionDates.length < 2) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Not enough data to calculate smoothing',
				})
			}

			// get every day of interval  and prefill with 0 (for the smoothing alg)
			const everyDaySinceHabitStarted = eachDayOfInterval({
				start: new Date(habit.createdAt),
				end: endOfYesterday(),
			}).map((date) => ({
				date,
				value: completionDates.includes(normalizeDate(date)) ? 1 : 0,
			}))

			return calculateSmoothingForRecurrence(habit, everyDaySinceHabitStarted)
		}),
})
