import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import FirebaseImage from "../FirebaseImage"

import { route } from "../../utils"

import {
	Designers,
	TopContainer,
	MiddleContainer,
	BottomContainer,
	DateContainer,
	InfoContainer,
	cardBorder
} from "./Common"
import DropCountdown from "../DropCountdown"

const Container = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	max-width: 580px;
	width: 100%;
	background: white;
	/* box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1); */

	a {
		${cardBorder}
		overflow: hidden;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 180px min-content;
		@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
			grid-template-rows: 200px min-content;
		}
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-rows: 270px min-content;
		}
	}
`

const Name = styled.div`
	--line-height: 1.5em;

	color: var(--black0);
	font-size: var(--fs-s);
	font-family: var(--font-family--serif);
	font-weight: bold;
	line-height: var(--line-height);
	height: calc(2 * var(--line-height));
	overflow: hidden;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		font-size: var(--fs-m);
	}
`

const BigDropCard = memo(
	({
		id,
		name,
		designers,
		itemCategory,
		attachments,
		mainImageIndex,
		dropsAtApproxTimestamp,
		dropsAtString
	}) => (
		<Container>
			<Link to={route("DROP_DETAILS", { id })}>
				<FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
				<InfoContainer>
					<TopContainer>
						<div>{itemCategory}</div>
						<Designers value={designers} />
					</TopContainer>
					<MiddleContainer flex>
						<Name>{name}</Name>
						<div className="align-right">
							<DropCountdown dropsAt={dropsAtString} id={id} />
						</div>
					</MiddleContainer>
					<BottomContainer>
						<DateContainer>{moment(dropsAtApproxTimestamp).format("LL")}</DateContainer>
					</BottomContainer>
				</InfoContainer>
			</Link>
		</Container>
	)
)

export default BigDropCard
