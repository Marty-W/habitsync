'use client'

import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'

import Settings from '~/app/settings/page'

const SettingsModal = () => {
	const router = useRouter()

	console.log('intercepted')

	// const handleOnOpenChange = (open: boolean) => {
	// 	if (!open) {
	// 		router.back()
	// 	}
	// }
	return (
		<Dialog.Root open>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/70" />

				<Dialog.DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<Settings />
					<span>Hello niece and nephwew</span>
				</Dialog.DialogContent>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default SettingsModal
