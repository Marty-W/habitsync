import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
import useMeasure from 'react-use-measure'

const ResizablePanel = ({ children }: PropsWithChildren) => {
  const [ref, { height }] = useMeasure()

  return (
    <motion.div
      animate={{ height: height || 'auto' }}
      className='relative overflow-hidden'
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <div ref={ref} className={`${height ? 'absolute' : 'relative'}`}>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.
  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet()
  return (key: string, value: string) => {
    if (key.startsWith('_')) return // Don't compare React's internal props.
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return
      seen.add(value)
    }
    return value
  }
}

export default ResizablePanel
