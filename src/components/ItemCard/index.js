import React, { Component } from "react"
import { Link } from "react-router-dom"
import { compose } from "recompose"
import Ratio from "react-ratio"

import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import { HeartButton } from "../SaveButton"
import LoadingSpinner from "../LoadingSpinner"

import formatDesigners from "../../utils/formatDesigners"
import formatPrice from "../../utils/formatPrice"
import formatSize from "../../utils/formatSize"
import {
	MiniContainer,
	Container,
	ThumbnailContainer,
	InfoContainer,
	TopContainer,
	InnerContainer,
	Designers,
	Name,
	SecondaryContainer,
	Price,
	Size,
	StyledIcon
} from "./StyledComponents"

const ERR_NO_IMAGE = "NO_IMAGE"

class ItemCardBase extends Component {
	state = {
		imageURL: "",
		error: null,
		isLoading: true
	}

	componentDidMount = () => {
		this.loadImage()
	}

	// Make sure if component's props change the images get updated
	componentDidUpdate = (prevProps) => {
		if (
			prevProps.item.attachments &&
			this.props.item.attachments &&
			prevProps.item.attachments[0] !== this.props.item.attachments[0]
		) {
			this.loadImage()
		}
	}

	loadImage = async () => {
		const { item, firebase } = this.props
		this.setState({ isLoading: true })

		try {
			const imageURL = await firebase.getImageURL(item.attachments[0], "M")
			this.setState({ imageURL })
		} catch (error) {
			this.setState({ error: ERR_NO_IMAGE })
			console.log(error)
		} finally {
			this.setState({ isLoading: false })
		}
	}

	render() {
		const { itemId, name, price, designers, size } = this.props.item

		const formattedDesigners = formatDesigners(designers)
		const formattedPrice = formatPrice(price)
		const formattedSize = formatSize(size)

		return (
			<Ratio ratio={2 / 3}>
				<Container className={this.props.className}>
					<Link to={`/i/${itemId}`}>
						<ThumbnailContainer>
							{this.state.error && this.state.error === ERR_NO_IMAGE ? (
								<StyledIcon icon="image" />
							) : this.state.isLoading ? (
								<LoadingSpinner size={7} delay={500} />
							) : (
								<img src={this.state.imageURL} alt="" />
							)}
						</ThumbnailContainer>
						<InfoContainer>
							<TopContainer>
								<InnerContainer>
									<Designers title={formattedDesigners}>{formattedDesigners}</Designers>
									<Name title={name}>{name}</Name>
								</InnerContainer>
								<HeartButton id={itemId} type="item" scale={2} />
							</TopContainer>
							<SecondaryContainer>
								<Price title={price ? `Cena: ${price}` : null}>{formattedPrice}</Price>
								<Size title={size ? `Rozmiar: ${formattedSize}` : null}>
									{formattedSize}
								</Size>
							</SecondaryContainer>
						</InfoContainer>
					</Link>
				</Container>
			</Ratio>
		)
	}
}

class ItemCardMiniBase extends Component {
	state = { imageURL: "" }

	componentDidMount = () => {
		this.loadImage()
	}

	// Make sure if component's props change the images get updated
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.item.attachments[0] !== this.props.item.attachments[0]) {
			this.loadImage()
		}
	}

	loadImage = async () => {
		const { item, firebase } = this.props

		try {
			const imageURL = await firebase.getImageURL(item.attachments[0], "M")
			this.setState({ imageURL })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { itemId, name, price, designers = [], size } = this.props.item

		return (
			<MiniContainer className={this.props.className}>
				<Link to={`/i/${itemId}`}>
					<ThumbnailContainer>
						<img src={this.state.imageURL} alt="" />
					</ThumbnailContainer>
					<InfoContainer>
						<TopContainer>
							<InnerContainer>
								{designers && (
									<Designers title={designers.join(" X ")}>
										{designers.join(" X ").toUpperCase()}
									</Designers>
								)}
								<Name title={name}>{name}</Name>
							</InnerContainer>
						</TopContainer>
						<SecondaryContainer>
							<Price title={`Cena: ${price}`}>{price}zł</Price>
							<Size title={size ? `Rozmiar: ${size}` : undefined}>{size}</Size>
						</SecondaryContainer>
					</InfoContainer>
				</Link>
			</MiniContainer>
		)
	}
}

const ItemCard = compose(
	withAuthentication,
	withFirebase
)(ItemCardBase)
const ItemCardMini = compose(
	withAuthentication,
	withFirebase
)(ItemCardMiniBase)

export { ItemCard, ItemCardMini }
