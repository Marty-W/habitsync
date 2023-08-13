import { TRPCError } from '@trpc/server'

import type { PrismaClient } from '@habitsync/db'

export const checkHabitExists = async (
	prisma: PrismaClient,
	habitId: string,
) => {
	const habit = await prisma.habit.findUnique({
		where: { id: habitId },
	})
	if (!habit) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: `Habit with id ${habitId} not found`,
		})
	}
	return habit
}

export const getHabitDetail = async (prisma: PrismaClient, habitId: string) => {
	const habit = await prisma.habit.findUnique({
		where: {
			id: habitId,
		},
		select: {
			description: true,
			labels: true,
			name: true,
			url: true,
			createdAt: true,
			recurrenceType: true,
			recurrenceDays: true,
			recurrenceStep: true,
		},
	})

	if (!habit) {
		throw new TRPCError({
			code: 'NOT_FOUND',
			message: 'Habit not found',
		})
	}

	return habit
}

export const getHabitRecurrenceAndTimestamps = async (
	prisma: PrismaClient,
	habitId: string,
) => {
	const habit = await prisma.habit.findUnique({
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

	return habit
}
