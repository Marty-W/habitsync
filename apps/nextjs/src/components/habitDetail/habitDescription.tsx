import { RouterOutputs } from '~/utils/trpc'
import Tag from '../ui/tag'

type Props = {
    desc: RouterOutputs['habit']['getDetail']
}

//TODO still needs a redesign, after current streak implemetation, maybe add it?

const HabitDescription = ({ desc }: Props) => (
    <>
        <div className='mb-2 flex flex-col'>
            <p className='flex-1 text-lg text-zinc-500'>{desc?.description}</p>
        </div>
        <div className='flex justify-center'>
            {desc?.labels.map(label => {
                if (label === 'habit') return null
                return <Tag key={label} tag={label} className='' />
            })}
        </div>
    </>
)

export default HabitDescription
