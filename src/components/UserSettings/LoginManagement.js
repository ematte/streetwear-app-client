import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

import LoadingSpinner from "../LoadingSpinner"
import ErrorBox from "../ErrorBox"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"

import PasswordManagement from "./PasswordManagement"
import SocialLoginManagement from "./SocialLoginManagement"

const Section = styled.div`
	margin: var(--spacing5) 0;
`

const LoginManagement = () => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const flashMessage = useFlash()
	const [activeMethods, setActiveMethods] = useState(null)
	const [error, setError] = useState(null)

	const fetchActiveMethods = async () => {
		try {
			const activeMethods = await firebase.auth.fetchSignInMethodsForEmail(authUser.email)
			setActiveMethods(activeMethods)
		} catch (error) {
			setError(error)
		}
	}

	useEffect(() => {
		fetchActiveMethods()
	}, [authUser, firebase])

	const onSuccess = (message) => {
		flashMessage(message)
		// fetchActiveMethods()
	}

	return error ? (
		<ErrorBox error={error} />
	) : !activeMethods ? (
		<LoadingSpinner />
	) : (
		<>
			<Section>
				<PasswordManagement activeMethods={activeMethods} onSuccess={onSuccess} />
			</Section>

			<Section>
				<SocialLoginManagement activeMethods={activeMethods} onSuccess={onSuccess} />
			</Section>
		</>
	)
}

export default LoginManagement
