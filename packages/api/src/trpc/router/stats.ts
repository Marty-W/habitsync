import { TRPCError } from '@trpc/server'
import { eachDayOfInterval, endOfYesterday, startOfDay } from 'date-fns'
import { z } from 'zod'

import { normalizeDate } from '@habitsync/lib'
import type { Weekday } from '@habitsync/lib/src/types'

import {
	getHabitSmoothing,
	getNumberOfDaysInInterval,
	getNumberOfTimestampsInInterval,
	getSuccessRate,
} from '../../common/recurrence'
import {
	getExtraStreakDaysForSpecificDays,
	getExtraStreakDaysForStepDays,
	getExtraStreakDaysForWorkdays,
} from '../../common/streaks'
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

			const habit = await ctx.prisma.habit.findUnique({
				where: {
					id: habitId,
				},
				select: {
					timestamps: true,
					createdAt: true,
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

			const interval = {
				start: input.startDate
					? startOfDay(new Date(input.startDate))
					: startOfDay(habit.createdAt),
				end: input.endDate
					? startOfDay(new Date(input.endDate))
					: startOfDay(new Date()),
			}

			//FIX rewrite the type casts
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

			const habit = await ctx.prisma.habit.findUnique({
				where: {
					id: habitId,
				},
				select: {
					timestamps: true,
					createdAt: true,
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

			const completionDates = habit.timestamps.map((timestamp) =>
				normalizeDate(timestamp.time),
			)

			// get every day of interval  and prefill with 0 (for the smoothing alg)
			const everyDaySinceHabitStarted = eachDayOfInterval({
				start: new Date(habit.createdAt),
				end: endOfYesterday(),
			}).map((date) => ({
				date,
				value: completionDates.includes(normalizeDate(date)) ? 1 : 0,
			}))

			if (habit.recurrenceType === 'every_day') {
				return getHabitSmoothing(
					everyDaySinceHabitStarted,
					new Date(habit.createdAt),
					{ alpha: 0.3, warmupDays: 30 },
				)
			} else if (habit.recurrenceType === 'every_workday') {
				const timestampsOnly = habit.timestamps.map(
					(timestamp) => timestamp.time,
				)
				const extraStreakDays = getExtraStreakDaysForWorkdays(timestampsOnly)
				return getHabitSmoothing(
					everyDaySinceHabitStarted,
					new Date(habit.createdAt),
					{ alpha: 0.3, warmupDays: 30, extraStreakDays },
				)
			} else if (habit.recurrenceType === 'every_x_days') {
				const timestampsOnly = habit.timestamps.map(
					(timestamp) => timestamp.time,
				)
				const extraStreakDays = getExtraStreakDaysForStepDays(
					timestampsOnly,
					habit.recurrenceStep!,
				)
				return getHabitSmoothing(
					everyDaySinceHabitStarted,
					new Date(habit.createdAt),
					{ alpha: 0.3, warmupDays: 30, extraStreakDays },
				)
			} else if (habit.recurrenceType === 'specific_days') {
				const timestampsOnly = habit.timestamps.map(
					(timestamp) => timestamp.time,
				)
				const extraStreakDays = getExtraStreakDaysForSpecificDays(
					timestampsOnly,
					habit.recurrenceDays as Weekday[],
				)
				return getHabitSmoothing(
					everyDaySinceHabitStarted,
					new Date(habit.createdAt),
					{ alpha: 0.3, warmupDays: 30, extraStreakDays },
				)
			}
		}),
})
