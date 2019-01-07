import { FORM_ERR, REGEX } from "../../constants"

export default (values) => {
	const { email, password } = values
	const errors = {}

	// E-mail
	if (!email) {
		errors.email = FORM_ERR.IS_REQUIRED
	} else if (!REGEX.EMAIL.test(email)) {
		errors.email = FORM_ERR.EMAIL_INVALID
	}

	// Hasło
	if (!password) {
		errors.password = FORM_ERR.IS_REQUIRED
	}

	return errors
}
