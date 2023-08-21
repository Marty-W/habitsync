import { useState } from 'react'

import EditHabits from '../editHabits'
import SyncFromLabels from '../syncFromLabels'
import SyncFromProjects from '../syncFromProjects'
import DesktopMainSettings from './desktopMainSettings'

export type CurrentView =
	| 'settings'
	| 'sync-projects'
	| 'sync-labels'
	| 'edit-habits'

const getTitle = (view: CurrentView) => {
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
	const [currentView, setCurrentView] = useState<CurrentView>('settings')
	return (
		<div>
			<h1 className="mb-4 text-center text-2xl">{getTitle(currentView)}</h1>
			{currentView === 'settings' && (
				<DesktopMainSettings
					changeView={(view: CurrentView) => setCurrentView(view)}
				/>
			)}
			{currentView === 'sync-projects' && <SyncFromProjects />}
			{currentView === 'sync-labels' && <SyncFromLabels />}
			{currentView === 'edit-habits' && <EditHabits />}
		</div>
	)
}

export default DesktopWrapper
