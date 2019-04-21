import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"
import shortid from "shortid"

import { useFirebase, useAuthentication } from "../../hooks"
import { withAuthorization } from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"
import { Form, Field } from "react-final-form"
import { LoaderButton, ButtonContainer } from "../../components/Button"
import { SmallTextBlock } from "../../components/StyledComponents"
import { Textarea } from "../../components/FormElements"
import UserPreview from "../../components/UserPreview"

const validate = (values) => {
	const errors = {}

	return errors
}

export const NewChat = ({ userId }) => {
	const authUser = useAuthentication()
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		const message = values.message

		actions.reset()

		let roomSnap = await firebase
			.currentUser()
			.collection("rooms")
			.doc(userId)
			.get()

		let roomId
		const messageId = shortid.generate()
		const senderId = authUser.uid
		const recipientId = userId

		if (!roomSnap.exists) {
			roomId = shortid.generate()

			// Create room if it doesn't exist yet
			await firebase.db
				.collection("rooms")
				.doc(roomId)
				.set({ id: roomId, userA: senderId, userB: recipientId })

			// Add room of recipient to sender
			await firebase
				.user(senderId)
				.collection("rooms")
				.doc(recipientId)
				.set({ id: roomId, otherUserId: recipientId })

			// Add room of sender to recipient
			await firebase
				.user(recipientId)
				.collection("rooms")
				.doc(senderId)
				.set({ id: roomId, otherUserId: senderId })
		} else {
			roomId = roomSnap.data().id
		}

		// add message to room
		await firebase.db
			.collection("rooms")
			.doc(roomId)
			.collection("messages")
			.doc(messageId)
			.set({
				id: messageId,
				createdAt: Date.now(),
				message,
				author: senderId,
				unread: true
			})
	}

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<form onSubmit={handleSubmit}>
						{/* Comment */}
						<SmallTextBlock>Treść wiadomości</SmallTextBlock>
						<Field name="message">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return <Textarea {...input} placeholder="Wiadomość" error={error} />
							}}
						</Field>

						<ButtonContainer noMargin>
							<LoaderButton
								text="Wyślij"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								primary
							/>
						</ButtonContainer>
					</form>
				)
			}}
		/>
	)
}

const NewChatPage = ({ match }) => {
	const userId = match.params.id

	return (
		<PageContainer>
			<UserPreview id={userId} />
			<NewChat userId={userId} />
		</PageContainer>
	)
}

const condition = (authUser) => !!authUser

export default compose(
	withRouter,
	withAuthorization(condition)
)(NewChatPage)