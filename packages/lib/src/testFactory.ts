import { faker } from '@faker-js/faker'
// FIX export it from package, not from npm, there is some info on turborepo/prisma
import { Timestamp } from '@prisma/client'

export const createRandomTimestamps = (
	start: Date,
	end: Date,
	numTimestamps: number,
): Timestamp[] => {
	const mock = faker.date.betweens(start, end, numTimestamps).map((date) => {
		return {
			id: faker.datatype.uuid(),
			time: date,
			habitId: faker.datatype.uuid(),
		}
	})

	return mock
}
