import Counter from 'components/ui/animatedCounter'
interface Props {
  completions: number
}

const TotalCompletions = ({ completions }: Props) => {
  return (
    <div className='text-center'>
      <div className='mb-3 text-xl font-semibold text-zinc-400'>
        <span>Completed</span>
      </div>
      <div className='relative'>
        <Counter
          from={0}
          to={completions}
          className='text-3xl font-black text-zinc-900'
          animationDuration={5}
        />
        <span className='absolute bottom-0'>times</span>
      </div>
    </div>
  )
}

export default TotalCompletions
