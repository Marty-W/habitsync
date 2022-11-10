import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db/client'

// TODO check for edge cases later
// 1. user postpones the habit for the day that is scheduled
// 2. user deletes habit
// 3. user "uncompletes" the habit for the day

const doisthook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { event_name, event_data, user_id } = req.body
    const userId = user_id.toString()
    const habitId = event_data.id.toString()

    if (event_name === 'item:completed') {
      // TODO batch findUnique user + habit

      try {
        await prisma.user.findUniqueOrThrow({
          where: {
            todoistId: userId,
          },
        })

        await prisma.habit.findUniqueOrThrow({
          where: {
            id: habitId,
          },
        })

        //TODO check if there is already a timestamp for today

        await prisma.timestamp.create({
          data: {
            habitId: habitId,
          },
        })

        res.status(200).json({ messaee: 'Success' })
      } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Resource not found in database' })
      }
    }
  }
}

export default doisthook
