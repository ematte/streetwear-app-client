import styled from "styled-components"

export const MainInfoContainer = styled.div`
	display: grid;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: max-content 1fr max-content;
	}

	margin-bottom: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};
	gap: 20px;
	overflow: hidden;

	> :first-child {
		margin: 0 auto;
	}

	@media (max-width: ${(p) => p.theme.breakpoints[0] - 1}px) {
		text-align: center;
	}

	.info-field {
		font-size: 0.98rem;
	}

	h2 {
		font-size: 1.45rem;
		font-weight: 500;
		margin: 0;
	}

	h3 {
		font-size: 0.98rem;
		font-weight: 300;
		margin: 7px 0 10px 0;
	}
`

export const InfoContainer = styled.div`
	padding-top: 10px;
`

export const SeparatedContainer = styled.div`
	display: flex;
	align-items: center;
	--vertical-margin: 10px;
	margin: var(--vertical-margin) calc(var(--vertical-margin) * -1);
	> * {
		padding: 3px 10px;
	}
	> * + * {
		border-left: 1px solid ${(p) => p.theme.colors.gray[75]};
	}
`

export const SecondContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`