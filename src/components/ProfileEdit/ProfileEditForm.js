import React from "react"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
import { compose } from "recompose"

import Button, { LoaderButton, ButtonContainer } from "../Button"
import { FieldRow, StyledInput, StyledTextarea } from "../Basics"
import { FormError } from "../FormElements"
import { withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"
import validate from "./validate"

const StyledForm = styled.form`
	max-width: 600px;
	margin: 0 auto;
`

const FieldsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
	grid-template-areas:
		"name email"
		"city phone"
		"info info";
`

const ProfileEditForm = (props) => {
	return (
		<Form
			onSubmit={props.onSubmit}
			validate={validate}
			initialValues={props.initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<FieldsContainer>
							{/* Name */}
							<FieldRow gridArea="name">
								<Field name="name">
									{({ input, meta }) => (
										<>
											<StyledInput {...input} type="text" placeholder="Imię i nazwisko" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

							{/* E-mail */}
							<FieldRow gridArea="email">
								<Field name="email">
									{({ input, meta }) => (
										<>
											<StyledInput {...input} type="text" placeholder="E-mail" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

							{/* City */}
							<FieldRow gridArea="city">
								<Field name="city">
									{({ input, meta }) => (
										<>
											<StyledInput
												{...input}
												type="text"
												placeholder="Miejsce zamieszkania"
											/>
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

							{/* Phone number */}
							<FieldRow gridArea="phone">
								<Field name="phone">
									{({ input, meta }) => (
										<>
											<StyledInput {...input} type="text" placeholder="Numer telefonu" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

							{/* Info */}
							<FieldRow gridArea="info">
								<Field name="info">
									{({ input, meta }) => (
										<>
											<StyledTextarea {...input} placeholder="Dodatkowe informacje" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>
						</FieldsContainer>

						<ButtonContainer centered>
							<LoaderButton
								text="Gotowe"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								primary
							/>
							<Button
								text="Anuluj"
								type="button"
								disabled={submitting}
								onClick={form.reset}
							>
								Anuluj
							</Button>
						</ButtonContainer>
						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</StyledForm>
				)
			}}
		/>
	)
}

export default compose(
	withAuthentication,
	withFirebase
)(ProfileEditForm)