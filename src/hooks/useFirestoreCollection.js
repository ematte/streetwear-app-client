import { useState, useEffect } from "react"

import useFirebase from "./useFirebase"

export default (collection) => {
	const firebase = useFirebase()
	const [items, setItems] = useState(null)

	const getData = () => {
		const unsubscribe = firebase.db.collection(collection).onSnapshot((snap) => {
			const itemsData = snap.docs.map((doc) => doc.data())
			setItems(itemsData)
		})

		return unsubscribe
	}

	useEffect(() => {
		getData()
	}, [])

	return items
}