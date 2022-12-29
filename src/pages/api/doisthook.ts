import { NextApiRequest, NextApiResponse } from 'next'
import { TODOIST_EVENTS } from 'lib/const'
import { prisma } from 'server/db/client'

const doisthook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { event_name, event_data } = req.body
    const habitId = event_data.id.toString()

    if (event_name === TODOIST_EVENTS.ITEM_COMPLETED && habitId) {
      try {
        await prisma.habit.findUniqueOrThrow({
          where: {
            id: habitId,
          },
        })

        await prisma.timestamp.create({
          data: {
            habitId: habitId,
          },
        })

        res.status(200).json({ message: 'Success' })
      } catch (e) {
        console.error(e)
        // you have to return 200 to avoid Doist retrying
        res.status(200).json({ message: 'Resource not found in database' })
      }
    }
  }
}

export default doisthook
