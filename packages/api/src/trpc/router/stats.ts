import { TRPCError } from "@trpc/server";
import { startOfDay } from "date-fns";
import { z } from "zod";

import { type Weekday } from "@habitsync/lib/src/types";

import {
  getNumberOfDaysInInterval,
  getNumberOfTimestampsInInterval,
  getSuccessRate,
} from "../../common/recurrence";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// TODO Check if there is a possibility to make sure these are in date format (or simply use date?)

export const statsRouter = createTRPCRouter({
  getTotalHabitCompletions: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }): Promise<number> => {
      const { habitId } = input;

      const totalCount = await ctx.prisma.timestamp.count({
        where: {
          habitId,
        },
      });

      return totalCount || 0;
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
      const { habitId } = input;

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
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Habit not found",
        });
      }

      const interval = {
        start: input.startDate
          ? startOfDay(new Date(input.startDate))
          : startOfDay(habit.createdAt),
        end: input.endDate
          ? startOfDay(new Date(input.endDate))
          : startOfDay(new Date()),
      };

      //FIX rewrite the type casts
      const numOfDaysInInterval = getNumberOfDaysInInterval(interval, {
        days: habit.recurrenceDays as Weekday[],
        step: habit.recurrenceStep!,
        type: habit.recurrenceType,
      });

      const numOfTimestampsInInterval = getNumberOfTimestampsInInterval(
        habit.timestamps,
        interval,
      );

      return getSuccessRate(numOfTimestampsInInterval, numOfDaysInInterval);
    }),
});
