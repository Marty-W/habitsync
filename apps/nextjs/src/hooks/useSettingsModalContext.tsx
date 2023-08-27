'use client'

import type { ReactNode } from 'react'
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

import { api } from '~/utils/trpc'

interface SettingsModalContextProps {
	isModalOpen: boolean
	toggleIsOpen: () => void
	closeAndIvalidate: () => void
	currentView: CurrentSettingsView
	changeSettingsView: (view: CurrentSettingsView) => void
	mountAndChangeView: (view: CurrentSettingsView) => void
}

export const SettingsModalContext =
	createContext<SettingsModalContextProps | null>(null)

export type CurrentSettingsView =
	| 'settings'
	| 'sync-projects'
	| 'sync-labels'
	| 'edit-habits'

export const SettingsModalProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [currentView, setCurrentView] =
		useState<CurrentSettingsView>('settings')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const utils = api.useContext()

	const mountAndChangeView = useCallback((view: CurrentSettingsView) => {
		setIsModalOpen(true)
		setCurrentView(view)
	}, [])

	const toggleIsOpen = useCallback(() => {
		setIsModalOpen(!isModalOpen)
	}, [isModalOpen])

	const closeAndIvalidate = useCallback(async () => {
		setIsModalOpen(false)
		await utils.habit.getAll.invalidate()
	}, [utils.habit.getAll])

	const changeSettingsView = useCallback((view: CurrentSettingsView) => {
		setCurrentView(view)
	}, [])

	const contextValue = useMemo(
		() => ({
			isModalOpen,
			toggleIsOpen,
			closeAndIvalidate,
			currentView,
			changeSettingsView,
			mountAndChangeView,
		}),
		[
			isModalOpen,
			toggleIsOpen,
			closeAndIvalidate,
			currentView,
			changeSettingsView,
			mountAndChangeView,
		],
	)

	return (
		<SettingsModalContext.Provider value={contextValue}>
			{children}
		</SettingsModalContext.Provider>
	)
}

export const useSettingsModalContext = () => {
	const context = useContext(SettingsModalContext)
	if (!context) {
		throw new Error(
			'useSettingsModalContext must be used within a SettingsModalProvider',
		)
	}
	return context
}
