import React, { useState, useEffect } from "react"

import LoadingSpinner from "../LoadingSpinner"
import { CustomFile } from "../FileHandler"

import ProfileEditForm from "./ProfileEditForm"

import { useAuthentication, useFirebase } from "../../hooks"
import getProfilePictureURL from "../../utils/getProfilePictureURL"

const ProfileEdit = () => {
	const authUser = useAuthentication()
	const firebase = useFirebase()
	const [initialValues, setInitialValues] = useState(null)

	useEffect(() => {
		// get all the basic values
		let initialValues = {
			name: authUser.name,
			email: authUser.email,
			city: authUser.city,
			phone: authUser.phone,
			info: authUser.info,
			messengerLink: authUser.messengerLink
		}

		// get the profile picture and create CustomFile
		if (authUser.profilePictureURLs && authUser.profilePictureURLs.length > 0) {
			const file = new CustomFile({
				storageRef: authUser.profilePictureRef || null,
				previewUrl: getProfilePictureURL(authUser, "L"),
				isUploaded: true
			})
			initialValues.file = file
		}

		// set initialValues for the form
		setInitialValues(initialValues)
	}, [authUser])

	const getNewImageInfo = async (file) => {
		// if there is no file, empty the fields
		if (!file) {
			return {
				profilePictureRef: null,
				profilePictureURLs: null
			}
		}

		// if the file hsn't changed, don't make changes
		if (file.isUploaded) return {}

		// upload the new file
		const snapshot = await firebase.uploadFile(
			`profile-pictures/${authUser.uid}`,
			file.data
		)

		// get the new ref and temporary url
		const newFileRef = snapshot.ref.fullPath
		const newUrl_temp = await firebase.getImageURL(newFileRef)

		return { profilePictureRef: newFileRef, profilePictureURLs: [newUrl_temp] }
	}

	const onSubmit = async (values, actions) => {
		// Get ref of current profile picture
		const oldFileRef = authUser.profilePictureRef || null

		// Get the values of profile picture related fields
		const newImageInfo = await getNewImageInfo(values.file)

		// Format the data for database
		const data = {
			name: values.name || initialValues.name || null,
			city: values.city || null,
			phone: values.phone || null,
			info: values.info || null,
			messengerLink: values.messengerLink || null,
			...newImageInfo
		}

		// Update the user with the new data
		await firebase.user(authUser.uid).update(data)

		// Remove old file if it's different from the new one
		if (oldFileRef && oldFileRef !== data.profilePictureRef) {
			await firebase.file(oldFileRef).delete()
		}
	}

	const isLoading = !initialValues

	return isLoading ? (
		<LoadingSpinner />
	) : (
		<ProfileEditForm onSubmit={onSubmit} initialValues={initialValues} />
	)
}

export default ProfileEdit
