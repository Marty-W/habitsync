import type { ReactNode } from 'react'
import { createContext, useCallback, useMemo, useState } from 'react'

import { api } from '~/utils/trpc'

interface SettingsModalContextProps {
	isModalOpen: boolean
	toggleIsOpen: () => void
	closeAndIvalidate: () => void
}

export const SettingsModalContext =
	createContext<SettingsModalContextProps | null>(null)

export const SettingsModalProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const utils = api.useContext()

	const toggleIsOpen = useCallback(() => {
		setIsModalOpen(!isModalOpen)
	}, [isModalOpen])

	const closeAndIvalidate = useCallback(() => {
		setIsModalOpen(false)
		utils.habit.getAll.invalidate()
	}, [utils.habit.getAll])

	const contextValue = useMemo(
		() => ({
			isModalOpen,
			toggleIsOpen,
			closeAndIvalidate,
		}),
		[isModalOpen, toggleIsOpen, closeAndIvalidate],
	)

	return (
		<SettingsModalContext.Provider value={contextValue}>
			{children}
		</SettingsModalContext.Provider>
	)
}
