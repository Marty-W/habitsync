import { DAYS } from '@habitsync/lib'

const WeekRow = () => (
	<div className="mb-4 grid grid-cols-7 justify-items-center">
		{DAYS.map((day, key) => (
			<span key={`${day}-${key}`} className="text-smuted-foreground/80">
				{day}
			</span>
		))}
	</div>
)

export default WeekRow
