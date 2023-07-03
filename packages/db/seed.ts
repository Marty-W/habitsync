import crypto from "crypto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const meditation = await prisma.habit.create({
    data: {
      name: "Meditation",
      description: "Meditate for 10 minutes",
      labels: ["Mindfulness", "Morning Routine"],
      recurrenceType: "every_day",
      userId: "cldef2o9x0000j0fz0nn9sabn",
      id: crypto.randomUUID(),
      url: "https://fakeurl.com",
      timestamps: {
        createMany: {
          data: [
            { time: "2023-06-26T00:00:00.000Z" },
            { time: "2023-06-27T00:00:00.000Z" },
            { time: "2023-06-29T00:00:00.000Z" },
            { time: "2023-07-01T00:00:00.000Z" },
            { time: "2023-07-02T00:00:00.000Z" },
            { time: "2023-07-03T00:00:00.000Z" },
          ],
        },
      },
    },
  })

  const walkTheDog = await prisma.habit.create({
    data: {
      name: "Walk the dog",
      description: "Walk the dog for 30 minutes",
      labels: ["Health", "Morning Routine"],
      recurrenceType: "every_x_days",
      recurrenceStep: 2,
      userId: "cldef2o9x0000j0fz0nn9sabn",
      id: crypto.randomUUID(),
      url: "https://fakeurl.com",
      timestamps: {
        createMany: {
          data: [
            { time: "2023-06-20T00:00:00.000Z" },
            { time: "2023-06-25T00:00:00.000Z" },
            { time: "2023-06-28T00:00:00.000Z" },
            { time: "2023-06-29T00:00:00.000Z" },
            { time: "2023-06-30T00:00:00.000Z" },
            { time: "2023-07-02T00:00:00.000Z" },
          ],
        },
      },
    },
  })

  console.log({ meditation, walkTheDog })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
