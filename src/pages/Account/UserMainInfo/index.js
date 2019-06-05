import React from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"

import ProfilePicture from "../../../components/ProfilePicture"
import getProfilePictureURL from "../../../utils/getProfilePictureURL"
import Button, { ButtonContainer } from "../../../components/Button"
import {
	MainInfoContainer,
	InfoContainer,
	SecondContainer,
	TopContainer
} from "./StyledComponents"
import { TYPE, SaveButton } from "../../../components/SaveButton"
import { ROUTES } from "../../../constants"
import { TextBlock, HorizontalContainer } from "../../../components/StyledComponents"
import SingleValueDisplay from "../../../components/SingleValueDisplay"
import useContentToggle from "../../../hooks/useContentToggle"
import { PageContainer } from "../../../components/Containers"
import MoreButton from "../../../components/MoreButton"

const MainInfo = ({ user, isAuthorized, userId, currentBreakpoint }) => {
	const { getToggleProps, getContentProps } = useContentToggle(false)

	const numDays = moment().diff(user.userSince, "days")

	return (
		<PageContainer>
			<MainInfoContainer>
				<TopContainer>
					<div>
						<ProfilePicture
							url={getProfilePictureURL(user, "M")}
							size={currentBreakpoint > 1 ? "125px" : "80px"}
						/>
					</div>
					<InfoContainer>
						<TextBlock bold size="m">
							{user.name}
						</TextBlock>
						<HorizontalContainer gap="3">
							<SingleValueDisplay title="W serwisie od">{numDays} dni</SingleValueDisplay>

							{user.feedback && (
								<SingleValueDisplay title="Opinie">
									{Array.from(user.feedback).length}
								</SingleValueDisplay>
							)}

							{user.city && (
								<SingleValueDisplay title="Miasto">{user.city}</SingleValueDisplay>
							)}
						</HorizontalContainer>
						{currentBreakpoint > 2 ? (
							<TextBlock color="black50">{user.info}</TextBlock>
						) : (
							user.info && (
								<>
									<TextBlock color="gray0" size="xs" {...getToggleProps()}>
										więcej informacji <FontAwesomeIcon icon="chevron-down" size="xs" />
									</TextBlock>
									<TextBlock color="black50" {...getContentProps()}>
										{user.info}
									</TextBlock>
								</>
							)
						)}
					</InfoContainer>
				</TopContainer>
				<SecondContainer>
					<ButtonContainer alignRight>
						{isAuthorized ? (
							<>
								<Button
									primary
									as={Link}
									to={ROUTES.NEW_ITEM}
									fullWidth={currentBreakpoint <= 1}
								>
									<span>Wystaw Przedmiot</span>
								</Button>
								<Button
									as={Link}
									to={ROUTES.ACCOUNT_SETTINGS.replace(":id", userId)}
									fullWidth={currentBreakpoint <= 1}
								>
									<span>Edytuj Profil</span>
								</Button>
							</>
						) : (
							<>
								<Button as={Link} to={ROUTES.CHAT_NEW.replace(":id", userId)} primary>
									<FontAwesomeIcon icon={["far", "envelope"]} size="lg" />
									<span>Wyślij wiadomość</span>
								</Button>
								<SaveButton
									id={userId}
									type={TYPE.USER}
									text="Obserwuj"
									savedText="Obserwowany"
								/>
								<MoreButton title="Więcej">
									<div>Zgłoś naruszenie</div>
								</MoreButton>
							</>
						)}
					</ButtonContainer>
				</SecondContainer>
			</MainInfoContainer>
		</PageContainer>
	)
}

export default withBreakpoints(MainInfo)
