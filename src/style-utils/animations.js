import { keyframes, css } from "styled-components/macro"

/* ----------------------------------------------
 * Generated by Animista on 2019-6-1 15:39:50
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

export const wobble = keyframes`
  0%,
  100% {
	transform: translateX(0%);
	transform-origin: 50% 50%;
  }
  15% {
		transform: translateX(-4px) rotate(-6deg);
  }
  30% {
		transform: translateX(3px) rotate(6deg);
  }
  45% {
		transform: translateX(-3px) rotate(-3.6deg);
  }
  60% {
		transform: translateX(2px) rotate(2.4deg);
  }
  75% {
		transform: translateX(-1px) rotate(-1.2deg);
  }`

export const wobbleAnimation = css`
	animation: ${wobble} 0.8s both;
`

export const shake = keyframes`
  0%,
  100% {
    transform: rotate(0deg);
    transform-origin: 50% 50%;
  }
  10% {
    transform: rotate(8deg);
  }
  20%,
  40%,
  60% {
    transform: rotate(-10deg);
  }
  30%,
  50%,
  70% {
    transform: rotate(10deg);
  }
  80% {
    transform: rotate(-8deg);
  }
  90% {
    transform: rotate(8deg);
  }
}`

export const shakeAnimation = css`
	animation: ${shake} 0.7s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
`

export const heartbeat = keyframes`
  from {
    transform: scale(1);
    transform-origin: center center;
    animation-timing-function: ease-out;
  }
  10% {
    transform: scale(1.15);
    animation-timing-function: ease-in;
  }
  17% {
    transform: scale(1.08);
    animation-timing-function: ease-out;
  }
  33% {
    transform: scale(1.18);
    animation-timing-function: ease-in;
  }
  45% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`

export const heartbeatAnimation = css`
	animation: ${heartbeat} 1.5s ease-in-out infinite both;
`
