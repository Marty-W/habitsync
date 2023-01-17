import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { BsArrowLeft } from 'react-icons/bs'

export const BackButton = () => {
  const router = useRouter()
  return (
    <motion.button whileTap={{ scale: 0.95 }} onClick={() => router.back()}>
      <BsArrowLeft size='1.8rem' className='text-slate-500 hover:text-slate-700' />
    </motion.button>
  )
}
