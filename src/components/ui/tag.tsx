import clsx from 'clsx'
import { displayValue } from '@tanstack/react-query-devtools/build/lib/utils'

interface Props {
  className?: string
  tag: string
}

const Tag = ({ tag, className }: Props) => {
  return (
    <div className={clsx(className, 'p-2')}>
      <span className='rounded-md bg-red-400 px-2 py-1 text-slate-100'>{tag}</span>
    </div>
  )
}

export default Tag
