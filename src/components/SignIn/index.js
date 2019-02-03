import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components"

import {
	StyledLink,
	FieldRow,
	FieldLabel,
	StyledInput,
	Header,
	Separator
} from "../Basics"
import { FormError } from "../FormElements"
import { FacebookButton, GoogleButton, LoaderButton } from "../Button"
import { PasswordForgetLink } from "../PasswordForget"
import { SignUpLink } from "../SignUp"
import { withFirebase } from "../Firebase"
import validate from "./validate"
import { ROUTES, AUTH_ERR } from "../../constants"
import { withGlobalContext } from "../GlobalContext"

const Container = styled.div`
	width: 100%;
	max-width: 280px;
	margin: 0 auto;
`

const SignInPage = () => {
	return (
		<Container>
			<Header>Zaloguj się</Header>
			<SignInGoogle />
			<SignInFacebook />
			<Separator text="lub" />
			<SignInForm />
			<PasswordForgetLink />
			<Separator />
			<SignUpLink />
		</Container>
	)
}

class SignInFormBase extends Component {
	state = { error: null }

	onSubmit = async (values, actions) => {
		const { email, password } = values
		const { globalContext, firebase, history } = this.props

		try {
			// Attempt signIn
			await firebase.signInWithEmail(email, password)
			// Reset form
			actions.reset()
			// Reset component
			await this.setState({ error: null })
			// Close modal if applicable
			if (globalContext.isLoginModalVisible) {
				globalContext.closeModal()
			}
			// Redirect
			history.push(ROUTES.HOME)
		} catch (error) {
			this.setState({ error })
		}
	}

	render() {
		const { error } = this.state

		return (
			<Form
				onSubmit={this.onSubmit}
				validate={validate}
				render={({ handleSubmit, submitting }) => (
					<form onSubmit={handleSubmit}>
						{/* E-mail */}
						<FieldRow>
							<Field name="email">
								{({ input, meta }) => (
									<>
										<FieldLabel>E-mail</FieldLabel>
										<StyledInput {...input} type="text" placeholder="E-mail" />
										<FormError message={meta.error} show={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Hasło */}
						<FieldRow>
							<Field name="password">
								{({ input, meta }) => (
									<>
										<FieldLabel>Hasło</FieldLabel>
										<StyledInput {...input} type="password" placeholder="Hasło" />
										<FormError message={meta.error} show={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						<LoaderButton
							text="Zaloguj się"
							type="submit"
							isLoading={submitting}
							disabled={submitting}
							fullWidth
						/>
						{error && <FormError message={error.message} show={error} />}
					</form>
				)}
			/>
		)
	}
}

class SignInGoogleBase extends Component {
	state = { error: null }

	onSubmit = async (event) => {
		event.preventDefault()
		const { globalContext, history, firebase } = this.props
		try {
			const socialAuthUser = await firebase.signInWithGoogle()
			// If this is the first time this user signs up, create a user in db
			if (socialAuthUser.additionalUserInfo.isNewUser) {
				await this.props.firebase.user(socialAuthUser.user.uid).set({
					name: socialAuthUser.user.displayName,
					email: socialAuthUser.user.email,
					items: [],
					profilePictureRef: null,
					profilePictureURLs: socialAuthUser.picture ? [socialAuthUser.picture] : null,
					permissions: [],
					roles: [],
					feedback: [],
					badges: {},
					userSince: Date.now(),
					city: null,
					savedItems: []
				})
			}
			this.setState({ error: null })
			// Close modal if applicable
			if (globalContext.isLoginModalVisible) {
				globalContext.closeModal()
			}
			history.push(ROUTES.HOME)
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_EMAIL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_EMAIL_ACCOUNT_EXISTS
			}
			this.setState({ error })
		}
	}

	render() {
		const { error } = this.state

		return (
			<form onSubmit={this.onSubmit}>
				<GoogleButton fullWidth type="submit">
					Zaloguj się przez Google
				</GoogleButton>
				{error && <p>{error.message}</p>}
			</form>
		)
	}
}

class SignInFacebookBase extends Component {
	state = { error: null }

	onSubmit = async (event) => {
		event.preventDefault()
		const { globalContext, history, firebase } = this.props
		try {
			const socialAuthUser = await firebase.signInWithFacebook()
			// If this is the first time this user signs up, create a user in db
			if (socialAuthUser.additionalUserInfo.isNewUser) {
				await this.props.firebase.user(socialAuthUser.user.uid).set({
					name: socialAuthUser.additionalUserInfo.profile.name,
					email: socialAuthUser.additionalUserInfo.profile.email,
					items: [],
					profilePictureRef: null,
					profilePictureURLs: socialAuthUser.picture ? [socialAuthUser.picture] : null,
					permissions: [],
					roles: [],
					feedback: [],
					badges: {},
					userSince: Date.now(),
					city: null,
					savedItems: []
				})
			}
			this.setState({ error: null })
			// Close modal if applicable
			if (globalContext.isLoginModalVisible) {
				globalContext.closeModal()
			}
			history.push(ROUTES.HOME)
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_EMAIL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_EMAIL_ACCOUNT_EXISTS
			}

			this.setState({ error })
		}
	}

	render() {
		const { error } = this.state

		return (
			<form onSubmit={this.onSubmit}>
				<FacebookButton fullWidth type="submit">
					Zaloguj się przez Facebooka
				</FacebookButton>
				{error && <p>{error.message}</p>}
			</form>
		)
	}
}

const SignInForm = compose(
	withRouter,
	withFirebase,
	withGlobalContext
)(SignInFormBase)

const SignInGoogle = compose(
	withRouter,
	withFirebase,
	withGlobalContext
)(SignInGoogleBase)

const SignInFacebook = compose(
	withRouter,
	withFirebase,
	withGlobalContext
)(SignInFacebookBase)

const SignInLink = withGlobalContext(({ globalContext, ...rest }) => {
	return (
		<p {...rest}>
			Masz już konto?{" "}
			{globalContext.isLoginModalVisible ? (
				<button onClick={() => globalContext.openModal(ROUTES.SIGN_IN)}>
					Zaloguj się
				</button>
			) : (
				<StyledLink to={ROUTES.SIGN_UP} className="link">
					Zaloguj się
				</StyledLink>
			)}
		</p>
	)
})

export default SignInPage
export { SignInForm, SignInGoogle, SignInFacebook, SignInLink }
