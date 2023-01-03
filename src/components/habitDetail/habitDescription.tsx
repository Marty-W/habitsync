import { RouterOutput } from 'lib/trpc'

type Props = {
  desc: RouterOutput['habit']['getDetail']
}

const HabitDescription = ({ desc }: Props) => (
  <>
    <div>
      {desc?.labels.map((label) => {
        if (label === 'habit') return null
        return (
          <span key={label} className='badge badge-primary'>
            {label}
          </span>
        )
      })}
    </div>
    <div className='my-4 flex flex-col'>
      <p className='flex-1 py-6 text-zinc-500'>{desc?.description}</p>
    </div>
    <div>
      <a href={desc?.url} target='_blank' rel='noreferrer'>
        Open in Todoist
      </a>
    </div>
  </>
)

export default HabitDescription