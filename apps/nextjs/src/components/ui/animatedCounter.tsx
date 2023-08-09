import React, { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'

interface Props {
	from: number
	to: number
	className?: string
	animationDuration: number
	postValue?: string
	postValueClassName?: string
}

const Counter = ({
	from,
	to,
	className,
	animationDuration,
	postValue,
	postValueClassName,
}: Props) => {
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

	return (
		<div>
			<span ref={ref} className={className} />
			{postValue && <span className={postValueClassName}>{postValue}</span>}
		</div>
	)
}

export default Counter
