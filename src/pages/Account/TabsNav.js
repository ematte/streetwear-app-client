import React, { useState } from "react"
import { withBreakpoints } from "react-breakpoints"
import Overlay from "../../components/Overlay"

import { Submenu, SubmenuContainer, Nav, NavItem, StyledNavLink } from "./TabsNav.styles"

const DropdownNavItem = ({ label, routes }) => {
	const [isOpen, setIsOpen] = useState(false)
	const onClick = () => {
		setIsOpen(!isOpen)
		console.log("adsf")
	}

	return (
		<NavItem onClick={onClick}>
			{label}{" "}
			{isOpen && (
				<>
					<SubmenuContainer>
						<Submenu>{routes}</Submenu>
					</SubmenuContainer>
					<Overlay onClick={onClick} />
				</>
			)}
		</NavItem>
	)
}

export const AccountPageTabs = withBreakpoints(
	({ currentBreakpoint, routes, userId, ...rest }) => {
		if (currentBreakpoint < 2) {
			routes = routes.reduce((acc, curr, i) => {
				curr.path = curr.path.replace(":id", userId)
				if (!curr.category) {
					return { ...acc, [curr.id]: curr }
				} else {
					const categoryArr = acc[curr.category] ? [...acc[curr.category], curr] : [curr]
					return { ...acc, [curr.category]: categoryArr }
				}
			}, {})
		}

		return <TabsNav routes={routes} {...rest} />
	}
)

const TabsNav = ({ routes, isAuthorized = false }) => {
	return (
		<Nav>
			{Object.entries(routes).map(([key, value], i) => {
				if (Array.isArray(value)) {
					let subRoutes = []
					value.forEach((route) => {
						if ((isAuthorized || !route.isProtected) && !route.isHidden) {
							subRoutes.push(
								<StyledNavLink to={route.path} key={route.id}>
									{route.shortLabel}
								</StyledNavLink>
							)
						}
					})

					return subRoutes.length > 0 ? (
						<DropdownNavItem label={key} routes={subRoutes} />
					) : null
				} else {
					return (
						(isAuthorized || !value.isProtected) &&
						!value.isHidden && (
							<NavItem>
								<StyledNavLink to={value.path} key={value.id}>
									{value.label}
								</StyledNavLink>
							</NavItem>
						)
					)
				}
			})}
		</Nav>
	)
}

export default TabsNav
