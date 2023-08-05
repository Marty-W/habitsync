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
      userId: "clk495e5h001ej0ejkl3wxhfa",
      id: crypto.randomUUID(),
      url: "https://fakeurl.com",
      createdAt: "2023-06-20T00:00:00.000Z",
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
      recurrenceType: "every_workday",
      userId: "clk495e5h001ej0ejkl3wxhfa",
      id: crypto.randomUUID(),
      url: "https://fakeurl.com",
      createdAt: "2023-06-20T00:00:00.000Z",
      timestamps: {
        createMany: {
          data: [
            { time: "2023-06-20T00:00:00.000Z" },
            { time: "2023-06-21T00:00:00.000Z" },
            { time: "2023-06-23T00:00:00.000Z" },
            { time: "2023-06-26T00:00:00.000Z" },
            { time: "2023-06-27T00:00:00.000Z" },
            { time: "2023-06-28T00:00:00.000Z" },
            { time: "2023-06-29T00:00:00.000Z" },
            { time: "2023-06-30T00:00:00.000Z" },
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
