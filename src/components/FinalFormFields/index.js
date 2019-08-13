import React from "react"
import { Field } from "react-final-form"
import ReactMarkdown from "react-markdown"
import styled, { css } from "styled-components/macro"
import StarRatings from "react-star-ratings"

import { Input, Textarea, FormElementContainer } from "../FormElements"
import {
	LiveFileHandler,
	FileHandlerText,
	FileHandler,
	FileHandlerSingle
} from "../FileHandler"
import DropdownFinalform from "../DropdownFinalform"
import MultiTextInputFinalform from "../MultiTextInputFinalform"

import { overlayCommon } from "../../style-utils"
import TagsInput from "../FormElements/TagsInput"

export const FieldLabel = styled.div`
	font-weight: bold;
`

export const ContentEditorContainer = styled.div`
	display: grid;
	max-width: 100%;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing2);

	> * {
		min-width: 0;
	}
`

export const PreviewStyles = styled.div`
	width: 100%;
	margin: 0 auto;
	border: 1px solid var(--gray25);
	padding: 0 var(--spacing2);
	position: relative;

	:empty {
		::before {
			${overlayCommon}
			content: "Podgląd";
			color: var(--gray100);
			font-size: 3.5rem;
			font-weight: bold;
		}
	}

	img {
		max-width: 100%;
		max-height: 900px;
	}
`

export const Section = styled.div`
	${(p) => p.flex && `display: flex;`}

	.sub-section {
		flex: 1 1 50%;
		:not(:last-child) {
			margin-right: var(--spacing2);
		}
	}

	.header {
		font-weight: bold;
	}
`

export const TextFF = ({ label, name, placeholder, info, password = false }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<Input
						{...input}
						type={password ? "password" : "text"}
						placeholder={placeholder}
						error={error}
						info={info}
					/>
				)
			}}
		</Field>
	</Section>
)

export const NumberFF = ({ label, name, step, min, max, placeholder, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<Input
						{...input}
						type="number"
						placeholder={placeholder}
						error={error}
						step={step}
						min={min}
						max={max}
						info={info}
					/>
				)
			}}
		</Field>
	</Section>
)

export const TextareaFF = ({ label, name, placeholder, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return <Textarea {...input} placeholder={placeholder} error={error} info={info} />
			}}
		</Field>
	</Section>
)

export const MultiTextInputFF = ({ label, name, placeholder, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name} type="select">
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<MultiTextInputFinalform
						{...input}
						placeholder={placeholder}
						error={error}
						info={info}
					/>
				)
			}}
		</Field>
	</Section>
)

export const DropdownFF = ({
	label,
	name,
	placeholder,
	options,
	isSearchable,
	isClearable,
	isMulti,
	info
}) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name} type="select">
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<DropdownFinalform
						{...input}
						options={options}
						placeholder={placeholder}
						error={error}
						isSearchable={isSearchable}
						isClearable={isClearable}
						isMulti={isMulti}
						info={info}
					/>
				)
			}}
		</Field>
	</Section>
)

export const TagsInputFF = ({ label, name, placeholder, isClearable, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name} type="select">
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<TagsInput
						{...input}
						placeholder={placeholder}
						error={error}
						isClearable={isClearable}
						info={info}
					/>
				)
			}}
		</Field>
	</Section>
)

export const FileHandlerFF = ({ label, name, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error.main : null
				const itemErrors = meta.error ? meta.error.specific : null
				return (
					<FileHandler {...input} error={error} itemErrors={itemErrors} info={info} />
				)
			}}
		</Field>
	</Section>
)

export const FileHandlerSingleFF = ({ label, name, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null

				return (
					<FileHandlerSingle
						{...input}
						error={error}
						info={info}
						containerStyles={css`
							width: 280px;
							height: 280px;
							margin: 0 auto;
						`}
					/>
				)
			}}
		</Field>
	</Section>
)

export const UserImageFF = ({ label, name, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null

				return (
					<FileHandlerSingle
						{...input}
						error={error}
						info={info}
						containerStyles={css`
							width: 220px;
							height: 220px;
							border-radius: 50%;
							margin: 0 auto;
						`}
					/>
				)
			}}
		</Field>
	</Section>
)

export const LiveFileHandlerFF = ({ label, name, uploadPath, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<LiveFileHandler {...input} uploadPath={uploadPath} error={error} info={info} />
				)
			}}
		</Field>
	</Section>
)

export const MarkdownEditorFF = ({ label, name, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				const { value } = input
				return (
					<ContentEditorContainer>
						<FileHandlerText {...input} error={error} info={info} />
						<PreviewStyles>
							<ReactMarkdown source={value} escapeHtml={false} />
						</PreviewStyles>
					</ContentEditorContainer>
				)
			}}
		</Field>
	</Section>
)

export const RatingFF = ({ label, name, info }) => (
	<Section>
		<div className="header">{label}</div>
		<Field name={name}>
			{({ input, meta }) => {
				const error = meta.error && meta.touched ? meta.error : null
				return (
					<FormElementContainer error={error} info={info}>
						<StarRatings
							rating={+input.value}
							changeRating={input.onChange}
							starRatedColor="gold"
							starHoverColor="#ffc311"
							numberOfStars={5}
							starDimension="20px"
							starSpacing="2px"
						/>
					</FormElementContainer>
				)
			}}
		</Field>
	</Section>
)

const withFinalFormWrapper = (C) => (props) => {
	let {
		label,
		showLabel = true,
		showPlaceholder = true,
		placeholder,
		name,
		info,
		...rest
	} = props

	if (showLabel && !label && process.env.NODE_ENV === "development") {
		console.warn(
			"A final form field is missing a label. If you don't want to use a label for this field, give it showLabel={false}"
		)
	}

	// show label if it's provided and not intentionally hidden
	showLabel = !!label && showLabel !== false
	// if placeholder is not provided it defaults to the same value as label
	// it can also be hidden by using showPlaceholder=false
	placeholder = showPlaceholder ? props.placeholder || props.label : undefined

	return (
		<Section>
			{showLabel && <FieldLabel>{props.label}</FieldLabel>}

			<Field name={props.name}>
				{({ input, meta }) => {
					const error = meta.error && meta.touched ? meta.error : null
					return (
						<C {...input} placeholder={placeholder} error={error} info={info} {...rest} />
					)
				}}
			</Field>
		</Section>
	)
}

export default withFinalFormWrapper
