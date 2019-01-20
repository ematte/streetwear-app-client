import styled, { css } from "styled-components"
import { RefinementList, Pagination } from "react-instantsearch-dom"

const InputCommon = css`
	color: ${(p) => p.theme.colors.black[75]};
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
	background: white;
	padding: 0 14px;
	height: 38px;
	min-width: 0;
`

export const MainGrid = styled.div`
	position: relative;
	display: flex;
	margin: 0 auto;
	box-sizing: content-box;
	padding: 0 10px 10px;
	margin-top: 10px;

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		padding: 0 20px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		max-width: 850px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: ${(p) => p.theme.breakpoints[3]}px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		max-width: ${(p) => p.theme.breakpoints[5]}px;
	}
`

export const StyledPagination = styled(Pagination)`
	grid-area: pagination;
	.ais-Pagination-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
	}

	.ais-Pagination-item {
		padding: 8px;
	}
`

export const StyledRefinementList = styled(RefinementList)`
	.ais-RefinementList-list {
		list-style: none;
		padding: 0;
		margin: 6px 0;
	}
	.ais-RefinementList-searchBox {
		width: 100%;
	}
	.ais-SearchBox-form {
		display: flex;
	}
	.ais-SearchBox-reset {
		display: none;
	}

	.ais-SearchBox-input {
		${InputCommon}
		height: 34px;
		flex: 1 1;
	}
	.ais-SearchBox-submit {
		border: 1px solid ${(p) => p.theme.colors.gray[75]};
		background: ${(p) => p.theme.colors.gray[100]};
		width: 38px;
		padding: 0;
		border-left: 0;
		outline: none !important;
		svg {
			width: 12px;
			height: 12px;
		}
	}
`

export const TopbarInnerContainer = styled.div`
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;

	display: grid;
	gap: 10px;

	grid-template-columns: auto 1fr auto auto;
	grid-template-areas: "sidebar-toggle search pagination sort";

	.ais-SearchBox {
		grid-area: search;
		outline: none;
		min-width: 0;
		* {
			min-width: 0;
		}
	}
	.ais-SearchBox-form {
		display: flex;
		min-width: 0;
	}
	.ais-SearchBox-input {
		${InputCommon}
		flex: 1 1 100%;
		min-width: 0;
		padding: 0 12px;
		height: 34px;
		font-size: 0.92rem;
	}
	.ais-SearchBox-submitIcon path {
		fill: #1f1f1f;
	}
	/* .ais-SearchBox-submit {
		display: none;
	} */
	.ais-SearchBox-reset {
		display: none;
	}
	.ais-SearchBox-submit {
		border: 1px solid ${(p) => p.theme.colors.gray[75]};
		background: ${(p) => p.theme.colors.gray[100]};
		width: 38px;
		padding: 0;
		border-left: 0;
		outline: none !important;
		svg {
			width: 12px;
			height: 12px;
		}
	}

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		max-width: 850px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: ${(p) => p.theme.breakpoints[3]}px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		max-width: ${(p) => p.theme.breakpoints[5]}px;
	}
`

export const Topbar = styled.div`
	border-top: 1px solid;
	border-bottom: 1px solid;
	border-color: ${(p) => p.theme.colors.gray[75]};
	position: sticky;
	z-index: 890;
	top: 46px;
	background: white;
	/* box-sizing: content-box; */
	padding: 10px;
	/* height: 54px; */
	margin: 10px 0;

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		margin: 20px 0;
		padding: 13px 20px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		top: 44px;
	}
`

export const FiltersToggle = styled.div`
	${InputCommon}
	grid-area: sidebar-toggle;
	padding: 0 14px;
	height: 38px;
	color: ${(p) => p.theme.colors.black[75]};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	svg {
		margin-right: 5px;
	}

	padding: 0 12px;
	height: 34px;
	font-size: 0.92rem;
`

export const Content = styled.main`
	grid-area: content;
	flex: 1;
`

export const SizeRefinementList = styled(StyledRefinementList)`
	.ais-RefinementList-list {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	.ais-RefinementList-count {
		display: none;
	}
`

export const FullscreenFilters = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1500;
	height: 100vh;
	background: white;
	padding: 20px;
`

export const SidebarInner = styled.div`
	position: sticky;
	top: 127px;
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	padding: 10px 20px;
	/* @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1500;
		height: 100vh;
		background: white;
		padding: 20px;
	} */
`

export const Sidebar = styled.aside`
	grid-area: filters;
	box-sizing: content-box;

	max-width: 100%;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		top: 44px;
		width: 220px;
		margin-right: 20px;
	}

	.ais-RefinementList-list {
		list-style: none;
		padding: 0;
		/* display: grid;
		grid-template-columns: repeat(2, 1fr); */
	}

	.ais-RefinementList-labelText {
		color: ${(p) => p.theme.colors.black[75]};
		text-transform: uppercase;
		padding: 0 4px 0 8px;
		font-size: 0.84rem;
	}
	.ais-RefinementList-count {
		background: ${(p) => p.theme.colors.gray[100]};
		border-radius: 4px;
		padding: 0 4px;
		font-size: 0.76rem;
	}
	.ais-RefinementList-item {
		padding: 3px 6px;
	}
	.ais-RefinementList-label {
		display: flex;
		align-items: center;
	}

	.ais-RangeInput {
		min-width: 0;
		width: 100%;
	}

	.ais-RangeInput-form {
		display: flex;
		min-width: 0;
	}
	.ais-RangeInput-separator {
		display: none;
	}
	.ais-RangeInput-submit {
		background: ${(p) => p.theme.colors.gray[100]};
		color: ${(p) => p.theme.colors.black[75]};
		flex: 0 0 38px;
		text-transform: uppercase;
		font-size: 0.84rem;
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
	}
	.ais-RangeInput-input {
		${InputCommon}
		padding: 0 4px 0 8px;
		margin-right: 6px;
		flex: 1 1 0;
		color: ${(p) => p.theme.colors.black[75]};
		&::placeholder {
			color: ${(p) => p.theme.colors.gray[50]};
		}

		-moz-appearance: textfield;
		:hover,
		:focus {
			-moz-appearance: number-input;
		}
	}

	.ais-MenuSelect-select {
		${InputCommon}
		border-radius: 3px;
		width: 100%;
	}

	.ais-ClearRefinements-button {
		width: 100%;
		margin-top: 16px;
		height: 38px;
		border-radius: 3px;
		background: white;
		border: 1px solid ${(p) => p.theme.colors.gray[50]};
		color: ${(p) => p.theme.colors.black[75]};
		cursor: pointer;
	}
`

export const FiltersHeader = styled.header`
	display: flex;
	.buttons {
		flex: 1;
	}
`