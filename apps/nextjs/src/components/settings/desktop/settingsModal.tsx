import { useContext } from 'react'
import { Settings } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { SettingsModalContext } from '~/hooks/useSettingsModalContext'
import DesktopWrapper from './desktopWrapper'

const SettingsModal = () => {
	const modalContext = useContext(SettingsModalContext)

	const handleSettingsOpen = () => {
		modalContext?.toggleIsOpen()
		modalContext?.changeSettingsView('settings')
	}

	return (
		<Dialog onOpenChange={handleSettingsOpen} open={modalContext?.isModalOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Settings size="1.2rem" />
				</Button>
			</DialogTrigger>
			<DialogContent className="border-blue-500 p-8">
				<DesktopWrapper />
			</DialogContent>
		</Dialog>
	)
}

export default SettingsModal
