import { animate } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

interface Props {
    from: number
    to: number
    className?: string
    animationDuration: number
}

const Counter = ({ from, to, className, animationDuration }: Props) => {
    const ref = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        const controls = animate(from, to, {
            duration: animationDuration,
            onUpdate(value) {
                ref.current!.textContent = value.toFixed(0)
            },
        })
        return () => controls.stop()
    }, [from, to, animationDuration])

    return <span ref={ref} className={className} />
}

export default Counter
