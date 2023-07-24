import { Checkbox } from "../ui/checkbox"

interface Props {
  name: string
  isSelected: boolean
  handleAddTask: (id: string) => void
  id: string
}

const SyncListItem = ({ name, isSelected, handleAddTask, id }: Props) => {
  return (
        
    {/* <div className="bg/95 border-muted-foreground flex h-16 w-full items-center "> */}
    {/*   <Checkbox */}
    {/*     className="mr-4" */}
    {/*     checked={isSelected} */}
    {/*     onCheckedChange={() => handleAddTask(id)} */}
    {/*   /> */}
    {/*   <span className="mr-3 text-xl">{name}</span> */}
    {/* </div> */}
  )
}

export default SyncListItem
