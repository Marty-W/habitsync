import { ChevronLeft } from 'lucide-react'

import type { CurrentSettingsView } from '~/hooks/useSettingsModalContext'
import { useSettingsModalContext } from '~/hooks/useSettingsModalContext'
import EditHabits from '../editHabits'
import SyncFromLabels from '../syncFromLabels'
import SyncFromProjects from '../syncFromProjects'
import DesktopMainSettings from './desktopMainSettings'

const getTitle = (view: CurrentSettingsView) => {
	switch (view) {
		case 'settings':
			return 'Settings'
		case 'sync-projects':
			return 'Sync from Projects'
		case 'sync-labels':
			return 'Sync from Labels'
		case 'edit-habits':
			return 'Edit Habits'
	}
}

const DesktopWrapper = () => {
	const { currentView, changeSettingsView } = useSettingsModalContext()
	return (
		<div>
			<div className="mb-4 grid grid-cols-[1fr_fit_1fr] items-center">
				{currentView !== 'settings' && (
					<ChevronLeft
						size={24}
						className="inline-block cursor-pointer"
						onClick={() => changeSettingsView('settings')}
					/>
				)}
				<h1 className="col-start-2 text-2xl">
					{getTitle(currentView ?? 'settings')}
				</h1>
			</div>
			{currentView === 'settings' && (
				<DesktopMainSettings changeView={changeSettingsView} />
			)}
			{currentView === 'sync-projects' && <SyncFromProjects />}
			{currentView === 'sync-labels' && <SyncFromLabels />}
			{currentView === 'edit-habits' && <EditHabits />}
		</div>
	)
}

export default DesktopWrapper
