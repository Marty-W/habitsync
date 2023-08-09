import { useState } from 'react'

const usePicker = () => {
	const [items, setItems] = useState<string[]>([])

	const handleEditItems = (id: string) => {
		setItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		)
	}

	return { items, editItems: handleEditItems }
}

export default usePicker
