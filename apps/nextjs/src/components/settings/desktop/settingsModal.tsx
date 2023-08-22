import { useContext } from 'react'
import { Settings } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { SettingsModalContext } from '~/hooks/useSettingsModalContext'
import DesktopWrapper from './desktopWrapper'

const SettingsModal = () => {
	const modalContext = useContext(SettingsModalContext)

	return (
		<Dialog
			onOpenChange={modalContext?.toggleIsOpen}
			open={modalContext?.isModalOpen}
		>
			<DialogTrigger>
				<Button variant="outline" size="icon">
					<Settings size="1.2rem" />
				</Button>
			</DialogTrigger>
			<DialogContent className="p-8">
				<DesktopWrapper />
			</DialogContent>
		</Dialog>
	)
}

export default SettingsModal
