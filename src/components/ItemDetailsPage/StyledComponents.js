import styled from "styled-components"

export const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	max-width: ${(p) => p.theme.breakpoints[4]}px;
	margin: 0 auto;
	height: 100%;
	width: 100%;
	max-width: 100%;
	overflow-x: auto;
`

export const ItemContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	max-width: 100%;
	height: 100%;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		flex-direction: row;
	}
`

export const InfoContainer = styled.div`
	flex: 0 0 100%;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	background: white;
	padding: 20px;
	padding-bottom: 70px;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		margin-left: 10px;
		max-width: 330px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: 380px;
		margin-left: 10px;
	}
`

export const UserInfoContainer = styled.div`
	margin-top: 10px;
`

export const ButtonsContainer = styled.div`
	margin: 10px 0;
	display: flex;
	align-content: flex-start;
`

export const MainInfo = styled.div`
	display: flex;
	> :last-child {
		padding: 0 5px;
		margin-right: 15px;
	}
	> :first-child {
		flex: 1;
	}
`

export const InfoItem = styled.div`
	text-transform: uppercase;
	font-weight: 500;
	color: #444;
	padding: 1px 0;
`

export const Description = styled.div`
	margin-top: 10px;
	color: #3d3d3d;
`

export const Sold = styled.div`
	color: ${(p) => p.theme.colors.danger[50]};
	margin-bottom: 12px;
	font-weight: 500;
`

export const Name = styled.div`
	color: ${(p) => p.theme.colors.black[75]};
	margin-bottom: 15px;
`

export const Designers = styled.h3`
	margin: 0;
	margin-bottom: 5px;
	font-weight: bold;
`

export const MoreInfo = styled.div`
	position: absolute;
	bottom: 0;
	padding-bottom: 20px;
	line-height: 1.08rem;
	text-transform: uppercase;
	font-weight: 500;
	color: ${(p) => p.theme.colors.gray[50]};
`
