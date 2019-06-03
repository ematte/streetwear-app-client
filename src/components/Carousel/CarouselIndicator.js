import React from "react"
import styled from "styled-components/macro"

import { mapN } from "../../utils"

const IndicatorContainer = styled.div`
	display: flex;
	align-items: center;
`
const IndicatorBubble = styled.div`
	--size: calc(${(p) => (p.isCurrent ? "1.5" : "1")} * 4px * ${(p) => p.scale || 1});
	--primary-color: ${(p) => p.primaryColor || "white"};
	--secondary-color: ${(p) => p.secondaryColor || "white"};

	background: ${(p) => (p.isCurrent ? "var(--primary-color)" : "var(--secondary-color)")};
	width: var(--size);
	height: var(--size);
	border-radius: 50%;

	:not(:first-child) {
		margin-left: var(--spacing1);
	}
`

const IndicatorOuterContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	margin-bottom: var(--spacing2);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	z-index: 10;
`

const Indicator = ({
	current,
	nOfElements,
	onClick,
	primaryColor,
	secondaryColor,
	scale
}) => {
	const hasMoreThanOne = nOfElements > 1

	return hasMoreThanOne ? (
		<IndicatorOuterContainer>
			<IndicatorContainer>
				{mapN(nOfElements, (i) => {
					const isCurrent = i === current
					return (
						<IndicatorBubble
							key={i}
							isCurrent={isCurrent}
							onClick={() => onClick(i)}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							scale={scale}
						/>
					)
				})}
			</IndicatorContainer>
		</IndicatorOuterContainer>
	) : null
}

export default Indicator
