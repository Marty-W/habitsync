import { api } from '~/utils/trpc'
import Loader from '~/components/ui/activeLoader'
import SyncList from './syncList'

const SyncFromProjects = () => {
	const userProjects = api.todoist.getUserProjects.useQuery()

	return (
		<>
			{userProjects.isLoading && <Loader size={55} className="mx-auto mt-4" />}
			{userProjects.isSuccess && (
				<SyncList syncSources={userProjects.data} type="project" />
			)}
		</>
	)
}

export default SyncFromProjects
