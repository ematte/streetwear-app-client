import React, { Component } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"
import Clear, { ClearRange } from "../Algolia/ClearCategoryButton"

const Header = styled.div`
	padding: 6px;
	color: ${(p) => p.theme.colors.black[0]};
	text-transform: uppercase;
	font-size: 0.85rem;
	font-weight: 600;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	svg {
		transition: transform 0.32s ease;
		${(p) => p.isFolded && "transform: rotate(-180deg);"}
	}
`

const InnerContainer = styled.div`
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
	}
`

export const AdaptiveFoldable = withBreakpoints(
	class extends Component {
		state = { isFolded: false }
		changeBreakpoint = 1

		componentDidMount = () => {
			if (this.props.startFolded) {
				this.setState({ isFolded: true })
			}
		}

		toggle = () => {
			const isFolded = !this.state.isFolded
			this.setState({ isFolded })
		}

		render() {
			const {
				children,
				currentBreakpoint,
				openTab,
				tab,
				attribute,
				showClear,
				resetState
			} = this.props

			// Based on current breakpoint choose between local or provided value
			const isFolded =
				+currentBreakpoint < +this.changeBreakpoint
					? openTab.id !== tab.id
					: this.state.isFolded
			// Based on current breakpoint choose between local or provided function
			const toggleFunction =
				+currentBreakpoint < +this.changeBreakpoint
					? () => this.props.toggle(tab.id)
					: this.toggle

			return (
				<div>
					<Header onClick={toggleFunction} isFolded={isFolded}>
						<span>
							{tab.displayName}{" "}
							{showClear &&
								(tab.id === "price" ? (
									<ClearRange attribute={attribute} resetState={resetState} />
								) : (
									<Clear attribute={attribute} />
								))}
						</span>
						<FontAwesomeIcon icon={"caret-up"} />
					</Header>
					<InnerContainer hidden={isFolded}>{children}</InnerContainer>
				</div>
			)
		}
	}
)

class Foldable extends Component {
	state = { isFolded: false }

	componentDidMount = () => {
		if (this.props.startFolded) {
			this.setState({ isFolded: true })
		}
	}

	toggle = () => {
		const isFolded = !this.state.isFolded
		this.setState({ isFolded })
	}

	render() {
		return (
			<div>
				<Header onClick={this.toggle} isFolded={this.state.isFolded}>
					<span>{this.props.title}</span>
					<FontAwesomeIcon icon={"caret-up"} />
				</Header>
				{this.props.onlyVisual ? (
					<div hidden={this.state.isFolded}>{this.props.children}</div>
				) : (
					!this.state.isFolded && <div>{this.props.children}</div>
				)}
			</div>
		)
	}
}

export default Foldable
