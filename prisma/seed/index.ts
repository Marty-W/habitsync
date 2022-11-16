import { PrismaClient } from '@prisma/client'
import { meditationTimestamps, pillTimestamps, reviewTimestamps } from './data'
const prisma = new PrismaClient()
async function main() {
  await prisma.timestamp.createMany({
    data: [...pillTimestamps, ...meditationTimestamps, ...reviewTimestamps],
  })
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
