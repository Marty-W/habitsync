import DetailHeader from '~/components/habitDetail/detailHeader'
import HabitDetail from '~/components/habitDetail/habitDetail'

interface Props {
	params: {
		id: string
	}
	searchParams: {
		name: string
	}
}

const HabitDetailPage = ({ params, searchParams }: Props) => {
	const { id } = params
	const { name } = searchParams

	return (
		<div className="flex min-h-screen flex-col px-7 py-8 xl:space-y-8">
			<DetailHeader title={name} />
			<HabitDetail habitId={id} />
		</div>
	)
}

export default HabitDetailPage
