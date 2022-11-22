import { NextApiRequest, NextApiResponse } from 'next'
import { TODOIST_EVENTS } from '../../lib/const'
import { prisma } from '../../server/db/client'

/* 
  This fn is hit every time an user completes a task in Doist
  It should: 
   1) check if the task is a habit
   2) if it is, create a timestamp for that habit
   3) recalculate / reset current streak
   4) update streaks
*/

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
        res.status(200).json({ messaee: 'Success' })
      } catch (e) {
        console.error(e)
        // you have to return 200 to avoid Doist retrying
        res.status(200).json({ message: 'Resource not found in database' })
      }
    }
  }
}

export default doisthook
