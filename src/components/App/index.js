import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import Navigation from "../Navigation"
import { Routes, Meta } from "../Routes"
import Footer from "../Footer"
import { withGlobalContextProvider } from "../GlobalContext"
import AuthModal from "../AuthModal"
import GlobalStyles from "./global-styles"

const ContentContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 0 3px;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		padding: 0 20px;
	}
`

class App extends React.Component {
	render = () => {
		return (
			<Router>
				<div id="App-Element">
					<Meta />
					<GlobalStyles>
						<Navigation />
						<ContentContainer>
							<Routes />
						</ContentContainer>
						<Footer />
					</GlobalStyles>
					<AuthModal />
				</div>
			</Router>
		)
	}
}

export default compose(
	withFirebase,
	withAuthenticationProvider,
	withGlobalContextProvider
)(App)
