import React from "react"
import styled from "styled-components/macro"
import Select from "react-select"

import FormElementContainer from "./container"
import { disabledStyles, hoverStyles, focusStyles, basicStyles } from "./commonStyles"

const StyledSelect = styled(Select).attrs({
	classNamePrefix: "react-select"
})`
	.react-select--container {
	}

	.react-select__control {
		${basicStyles}

		border-radius: 0;
		height: var(--form-element-height);

		&:not([disabled]) {
			:hover {
				${hoverStyles}
			}
		}
	}
	.react-select__control--menu-is-open,
	.react-select__control--is-focused {
		${focusStyles}
	}
	.react-select__control--is-disabled {
		${disabledStyles}
	}

	.react-select__value-container {
		padding: 0 var(--spacing2);
		overflow: visible;
	}

	.react-select__indicators {
	}

	.react-select__menu {
		border-radius: 0;
		z-index: 20;
	}
	.react-select__menu-list {
	}

	.react-select__option {
		&:active {
			background: var(--black0);
			color: white;
		}
	}
	.react-select__option--is-selected {
		background: var(--gray100);
		color: black;
	}
	.react-select__option--is-focused {
		background: var(--black25);
		color: white;
	}
`

const Dropdown = ({
	placeholder = "Wybierz",
	noOptionsMessage = "Brak opcji",
	info,
	error,
	disabled,
	...rest
}) => (
	<FormElementContainer info={info} error={error}>
		<StyledSelect
			hasError={!!error}
			isDisabled={disabled}
			placeholder={placeholder}
			// noOptionsMessage is a function that receives inputValue but I don't care about that
			noOptionsMessage={() => noOptionsMessage}
			{...rest}
		/>
	</FormElementContainer>
)

export default Dropdown
