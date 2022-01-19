import React from "react"
import { withRouter } from "react-router-dom"
import { PageContainer } from "../../../components/Containers"

import useFirebase from "../../../hooks/useFirebase"
import { formatDealDataForDb, MODE } from "../../../utils/formatting/formatDealData"
import { CONST } from "../../../constants"
import { route } from "../../../utils"

import Form from "./Form"
import { useFlash } from "../../../hooks"

const Add = ({ history }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()

	const onSubmit = async (values, form) => {
		try {
			const file = values.file

			// Upload file to storage and get its ref
			const snapshot = await firebase.uploadFile(
				CONST.STORAGE_BUCKET_DEAL_ATTACHMENTS,
				file.data
			)
			const imageRef = snapshot.ref.fullPath

			// Format the values for db
			const formattedData = formatDealDataForDb({ ...values, imageRef }, MODE.CREATE)

			// Add to database
			await firebase.deal(formattedData.id).set(formattedData)

			setTimeout(() => {
				form.reset()
				history.push(route("ADMIN_DEALS"))
			})
		} catch (error) {
			console.error(error)
			flashMessage({
				type: "error",
				text: "Wystąpił błąd",
				details: "Więcej informacji w konsoli"
			})
		}
	}

	return (
		<PageContainer>
			<Form onSubmit={onSubmit} />
		</PageContainer>
	)
}

export default withRouter(Add)
