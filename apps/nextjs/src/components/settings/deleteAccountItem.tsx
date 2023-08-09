'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import { api } from '~/utils/trpc'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '~/components/ui/alertDialog'
import ClickSpinner from '../ui/clickSpinner'
import SettingsItem from './settingsItem'

const DeleteAccountItem = () => {
	const router = useRouter()
	const [mutationOutput, setMutationOutput] = useState<ReactNode | null>(null)
	const deleteAcc = api.acc.deleteAcc.useMutation({
		onMutate: () => {
			setMutationOutput(<ClickSpinner isActive />)
		},
		onSuccess: () => {
			setMutationOutput(<span>Acount deleted. Redirecting...</span>)
			setTimeout(() => {
				void router.push('/')
			}, 2000)
		},
		onError: (err) => {
			setMutationOutput(<span>Something went wrong: {err.message}</span>)
		},
	})

	const handleAccDelete = (e: React.MouseEvent) => {
		e.preventDefault()
		deleteAcc.mutate()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<SettingsItem title="Delete account" as="button" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{!mutationOutput ? (
						<>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleAccDelete}>
								Continue
							</AlertDialogAction>
						</>
					) : (
						<div className="flex items-center justify-center">
							{mutationOutput}
						</div>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteAccountItem
