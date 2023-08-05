import SettingsButton from "../settingsButton"
import GoBackButton from "../ui/goBackButton"

interface Props {
  title: string
}

const DetailHeader = ({ title }: Props) => {
  return (
    <div className="mb-8 grid grid-cols-[0.2fr_1fr_0.2fr] place-items-center">
      <GoBackButton />
      <h1 className="text-muted-foreground text-lg">{title}</h1>
      <div className="flex items-center justify-end">
        <SettingsButton />
      </div>
    </div>
  )
}

export default DetailHeader
