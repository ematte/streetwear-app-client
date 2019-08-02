import React from "react"
import styled from "styled-components/macro"
import SwipeableViews from "react-swipeable-views"
import Lightbox from "react-image-lightbox"

import FirebaseImage from "../FirebaseImage"
import { useCarousel, CarouselIndicator, CarouselButton } from "../Carousel"

import { Thumbnails } from "./Thumbnails"
import useLightbox from "./useLightbox"

const OuterContainer = styled.div`
	display: grid;
	grid-template-rows: 1fr min-content;
	height: 100%;
	> * {
		min-height: 0;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		min-height: 480px;
		max-height: 620px;
	}
`

const ContentContainer = styled.div`
	position: relative;
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		margin: 0 calc(-1 * var(--spacing3));
	}
`

const MainImageArea = styled.div`
	height: 100%;
	> * {
		height: 100%;
	}
`

const MainImageContainer = styled.div`
	background: var(--almost-white);
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: zoom-in;
`

const MainImage = ({ storageRef, isCurrent, openLightbox }) => (
	<MainImageContainer>
		<FirebaseImage
			storageRef={storageRef}
			size="L"
			deferLoading={!isCurrent}
			onClick={openLightbox}
			mode="contain"
		/>
	</MainImageContainer>
)

const ImageGallery = ({ storageRefs, lightboxTitle, showThumbnails }) => {
	const nOfElements = storageRefs.length
	const hasMoreThanOne = nOfElements > 1

	const { current, changeIndex, previous, next } = useCarousel(nOfElements)
	const { isLightboxOpen, lightboxProps, openLightbox } = useLightbox(
		current,
		storageRefs
	)

	return (
		<OuterContainer>
			<ContentContainer>
				{/* Current Image */}
				<MainImageArea>
					<SwipeableViews
						index={current}
						onChangeIndex={changeIndex}
						containerStyle={{ height: "100%" }}
					>
						{storageRefs.map((storageRef, i) => (
							<MainImage
								storageRef={storageRef}
								key={storageRef}
								isCurrent={i === current}
								openLightbox={openLightbox}
							/>
						))}
					</SwipeableViews>
				</MainImageArea>

				{/* Buttons */}
				{hasMoreThanOne && <CarouselButton onClick={previous} direction="left" />}
				{hasMoreThanOne && <CarouselButton onClick={next} direction="right" />}

				{/* Indicator */}
				<CarouselIndicator
					nOfElements={nOfElements}
					current={current}
					onClick={changeIndex}
					primaryColor="var(--black25)"
					secondaryColor="var(--gray25)"
					scale={1.5}
				/>
			</ContentContainer>

			{/* Thumbnails */}
			{showThumbnails && hasMoreThanOne && (
				<Thumbnails
					storageRefs={storageRefs}
					onChangeIndex={changeIndex}
					current={current}
				/>
			)}

			{/* Lightbox */}
			{isLightboxOpen && (
				<Lightbox
					{...lightboxProps}
					onMoveNextRequest={next}
					onMovePrevRequest={previous}
					imageTitle={lightboxTitle}
				/>
			)}
		</OuterContainer>
	)
}

export default ImageGallery
