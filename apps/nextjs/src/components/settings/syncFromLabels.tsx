import { api } from '~/utils/trpc'
import Loader from '~/components/ui/activeLoader'
import SyncList from './syncList'

const SyncFromLabels = () => {
	const userLabels = api.todoist.getUserLabels.useQuery()

	return (
		<>
			{userLabels.isLoading && <Loader size={55} className="mx-auto mt-4" />}
			{userLabels.isSuccess && (
				<SyncList syncSources={userLabels.data} type="label" />
			)}
		</>
	)
}

export default SyncFromLabels
