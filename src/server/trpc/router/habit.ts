import { z } from 'zod'
import { CalendarData } from '../../../types'
import { t } from '../trpc'

//TODO check how trpc handles errors and how to handle them

export const habitRouter = t.router({
  setUserHabits: t.procedure
    .input(z.object({ labelName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const { labelName } = input

      //TODO add option to fetch tasks based on project_id, and also todoist filters

      const userHabits = await ctx.doist.getTasks({
        label: labelName,
      })

      if (userId && userHabits) {
        // RIGHT NOW SETTING TODOIST_ID ON THE FIRST FETCHED TASK, BUT COULD BE HANDLED BETTER
        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            todoistId: userHabits[0]?.creatorId,
          },
        })

        const formattedHabitsForDb = userHabits.map((habit) => {
          const { id, content, description, labels, url, creatorId } = habit

          return {
            id,
            name: content,
            description,
            labels,
            url,
            userId,
          }
        })

        await ctx.prisma.habit.createMany({
          data: formattedHabitsForDb,
          skipDuplicates: true,
        })
      }
    }),
  getUserHabits: t.procedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id

    if (userId) {
      try {
        const habits = await ctx.prisma.habit.findMany({
          where: {
            userId,
          },
          select: {
            id: true,
            labels: true,
            name: true,
            projectId: true,
          },
        })

        return habits
      } catch (err) {
        console.error(err)
      }
    }
  }),
  getHabitDetail: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const { id } = input

      if (userId) {
        try {
          const habit = await ctx.prisma.habit.findUnique({
            where: {
              id,
            },
            select: {
              description: true,
              id: true,
              labels: true,
              name: true,
              projectId: true,
              url: true,
              timestamps: true,
            },
          })

          return habit
        } catch (err) {
          console.error(err)
        }
      }
    }),
  getHabitCalendarData: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const { id } = input

      if (userId) {
        try {
          const timestamps = await ctx.prisma.habit.findUnique({
            where: {
              id,
            },
            select: {
              timestamps: true,
            },
          })

          return timestamps?.timestamps.reduce(
            (acc: CalendarData, timestamp) => {
              const date = new Date(timestamp.time)
              const year = date.getFullYear()
              const month = date.getMonth() + 1

              if (!acc[year]) {
                acc[year] = {}
              }

              if (!acc[year][month]) {
                acc[year][month] = []
              }

              if (!acc[year][month].includes(date.getDate())) {
                acc[year][month].push(date.getDate())
              }

              return acc
            },
            {}
          )
        } catch (err) {
          console.error(err)
        }
      }
    }),
})
