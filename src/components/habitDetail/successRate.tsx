import Counter from 'components/ui/animatedCounter'
interface Props {
  rate: string
}

const SuccessRate = ({ rate }: Props) => {
  return (
    <div className='text-center'>
      <div className='mb-3 text-xl font-semibold text-zinc-400'>
        <span>Completed</span>
      </div>
      <div className='relative'>
        <Counter
          from={0}
          to={Number(rate)}
          className='text-3xl font-black text-zinc-900'
          animationDuration={5}
        />
        <span className='absolute bottom-0'>%</span>
      </div>
    </div>
  )
}

export default SuccessRate
