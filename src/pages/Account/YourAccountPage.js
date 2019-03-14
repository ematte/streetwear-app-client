import React, { Component } from "react"
import { compose } from "recompose"
import { Route, Switch, Redirect, withRouter, NavLink } from "react-router-dom"

import { withFirebase } from "../../components/Firebase"
import { withAuthorization } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import MainInfo from "../../components/UserMainInfo"

import {
	TabsNav,
	TabsNavItem,
	TabsNavContainer,
	MainGrid,
	InnerContainer
} from "./StyledComponents"

class AccountPage extends Component {
	state = {
		error: null,
		isLoading: true,
		user: null
	}

	componentDidMount() {
		this.setState({ user: this.props.authUser, isLoading: false })
	}

	render() {
		if (this.state.error) throw this.state.error

		const { isLoading, user } = this.state
		const { routes, match } = this.props

		const userId = match.params.id
		const isUserOwner = true

		const commonProps = { user, userId, isUserOwner }

		return (
			<MainGrid>
				{!isLoading && user ? (
					<>
						<MainInfo {...commonProps} />
						<InnerContainer>
							<TabsNavContainer>
								<TabsNav>
									{routes.map(
										(route, i) =>
											(isUserOwner || !route.isProtected) && (
												<TabsNavItem
													as={NavLink}
													to={route.path.replace(":id", userId)}
													key={i}
												>
													{route.label}
												</TabsNavItem>
											)
									)}
								</TabsNav>
							</TabsNavContainer>

							<Switch>
								{routes.map(
									(route) =>
										(isUserOwner || !route.isProtected) && (
											<Route
												exact
												path={route.path}
												render={() => <route.component {...commonProps} />}
											/>
										)
								)}
								{/* If no route matches redirect to items subroute */}
								<Route
									path="*"
									render={() => (
										<Redirect
											to={routes
												.find((r) => r.id === "items")
												.path.replace(":id", userId)}
										/>
									)}
								/>
							</Switch>
						</InnerContainer>
					</>
				) : (
					<LoadingSpinner />
				)}
			</MainGrid>
		)
	}
}

const condition = (authUser) => !!authUser

export default compose(
	withAuthorization(condition),
	withFirebase,
	withRouter
)(AccountPage)
