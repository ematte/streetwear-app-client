import React, { useState, useEffect } from "react"
import equal from "deep-equal"
import { withRouter } from "react-router-dom"
import { InstantSearch } from "react-instantsearch-dom"
import { decodeURL, encodeURL } from "../../utils/algoliaURLutils"

const InstantSearchWrapper = withRouter(
	({
		indexName,
		onSearchStateChange,
		urlToState,
		children,
		history,
		location,
		defaultSearchState,
		...rest
	}) => {
		const [searchState, setSearchState] = useState(defaultSearchState)
		const [shouldRefresh, setShouldRefresh] = useState(false)

		useEffect(() => {
			const state = createStateFromURL()
			setSearchState(state)
		}, [location])

		useEffect(() => {
			/* this is required in order for the component to not get stuck on a later
		page without the ability to navigate back other than clearing all filters */

			let newState = { ...searchState, page: 1 }
			// debugger
			setSearchState(newState)
		}, [])

		const refresh = () => {
			setShouldRefresh(true)
			setShouldRefresh(false)
		}

		const shouldScroll = (oldState, newState) => {
			/* get copies of current and prev states and compare all values except for page
		to determine whether the component should scroll back to the top */
			const _oldState = { ...oldState, page: null }
			const _newState = { ...newState, page: null }
			const areEqual = equal(_newState, _oldState)
			if (!areEqual) {
				window.scrollTo(0, 0)
			}
		}

		const handleSearchStateChange = async (newSearchState) => {
			// const _newSearchState = await cloneDeep(newSearchState)

			// shouldScroll(cloneDeep(searchState), _newSearchState)

			const formattedState = await onSearchStateChange(newSearchState)
			const url = encodeURL(formattedState)
			// debugger
			history.push(url)

			// update the searchState (to increase apparent performance)
			// setSearchState(newSearchState)
		}

		const createStateFromURL = () => {
			try {
				const parsedSearch = decodeURL(location.search)
				const formattedState = urlToState(parsedSearch)
				// debugger
				return formattedState
			} catch (e) {
				console.log(e)
				// if there was a problem while parsing, use default state instead
				return defaultSearchState
			}
		}

		return (
			<InstantSearch
				appId={process.env.REACT_APP_APP_ID}
				apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
				indexName={indexName}
				searchState={searchState}
				onSearchStateChange={handleSearchStateChange}
				createURL={decodeURL}
				refresh={shouldRefresh}
				{...rest}
			>
				{children}
			</InstantSearch>
		)
	}
)

export default InstantSearchWrapper