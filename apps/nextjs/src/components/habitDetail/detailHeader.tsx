'use client'

import { useParams } from 'next/navigation'

import SettingsButton from '../settingsButton'
import GoBackButton from '../ui/goBackButton'
import ThemeToggle from '../ui/themeToggle'

interface Props {
	title: string
}

const DetailHeader = ({ title }: Props) => {
	const params = useParams()
	return (
		<div className="mb-8 grid grid-cols-[0.2fr_1fr_0.2fr] place-items-center">
			<GoBackButton to="/habits" className="md:hidden" />
			<h1 className="text-smuted-foreground text-lg md:text-2xl">{title}</h1>
			<div className="flex items-center justify-end space-x-1 md:hidden">
				<ThemeToggle />
				<SettingsButton from={`habits/${params?.id as string}` ?? '/habits'} />
			</div>
		</div>
	)
}

export default DetailHeader
