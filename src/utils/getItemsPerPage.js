import { THEME } from "../constants"

export default () => {
	const width = window.innerWidth
	const height = window.innerHeight

	const rows = Math.ceil(height / 350)
	let cols = 1

	if (width < THEME.breakpoints[3]) {
		cols = 2
	} else if (width < THEME.breakpoints[5]) {
		cols = 3
	} else if (width >= THEME.breakpoints[5]) {
		cols = 4
	}

	console.log("rows", rows)
	console.log("cols", cols)
	return rows * cols
}