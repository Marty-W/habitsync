import { Checkbox } from "../ui/checkbox"

interface CommonProps {
  name: string
}

interface PassiveProps extends CommonProps {
  kind: "passive"
}

interface ActiveProps extends CommonProps {
  kind: "active"
  id: string
  isSelected: boolean
  handleSelect: (id: string) => void
}

type Props = PassiveProps | ActiveProps

const HabitListItem = (props: Props) => {
  if (props.kind === "passive") {
    const { name } = props
    return (
      <div className="bg/95 border-muted-foreground flex h-16 w-full items-center ">
        <span className="mr-3 text-xl">{name}</span>
      </div>
    )
  }

  const { name, id, isSelected, handleSelect } = props

  return (
    <div className="bg/95 border-muted-foreground flex h-16 w-full items-center ">
      <Checkbox
        className="mr-4"
        checked={isSelected}
        onCheckedChange={() => handleSelect(id)}
      />
      <span className="mr-3 text-xl">{name}</span>
    </div>
  )
}

export default HabitListItem
