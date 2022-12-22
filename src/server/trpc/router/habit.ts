import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

//TODO check how trpc handles errors and how to handle them

export const habitRouter = t.router({
  setAll: authedProcedure
    .input(z.object({ labelName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id
      const { labelName } = input

      //TODO add option to fetch tasks based on project_id, and also todoist filters

      const userHabits = await ctx.doist.getTasks({
        label: labelName,
      })

      if (userHabits) {
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
  getAll: authedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id

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
  }),
  getDetail: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const habit = await ctx.prisma.habit.findUnique({
        where: {
          id,
        },
        select: {
          description: true,
          labels: true,
          name: true,
          url: true,
        },
      })

      return habit
    }),
})
