import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db/client'

const doisthook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { event_name, event_data, user_id } = req.body

    if (event_name === 'item:completed') {
      const userId = user_id.toString()
      const habitId = event_data.id
      const utc = Date.now()

      try {
        await prisma.user.findUniqueOrThrow({
          where: {
            todoistId: userId,
          },
        })

        //TODO this could be batched
        await prisma.habit.findUniqueOrThrow({
          where: {
            id: habitId,
          },
        })

        // TODO check if habit is already completed for today
        // TODO catch also habit updated => delete timestamp for today

        await prisma.habit.update({
          where: {
            id: habitId,
          },
          data: {
            timestamps: {
              push: utc,
            },
          },
        })

        res.status(200).json({ message: 'Success' })
      } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Resource not found in database' })
      }
    }
  }
}

export default doisthook
