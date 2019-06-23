import React from "react"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import { VirtualToggle } from "../Algolia/Virtual"
import { Results, VirtualRefinement } from "../Algolia/Helpers"

const StatelessSearchWrapper = (props) => {
	const {
		indexName,
		refinements,
		filters,
		exclude,
		limit = 3,
		children,
		showArchived = false
	} = props

	const isRenderFn = typeof children === "function"

	console.log(exclude)

	// const filters = `NOT id:${exclude}`

	return (
		<InstantSearch
			appId={process.env.REACT_APP_APP_ID}
			apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
			indexName={indexName}
		>
			<Configure filters={filters || undefined} hitsPerPage={limit} />

			{/* apply necessary refinements */}
			{/* {refinements &&
				Object.entries(refinements).map(([key, value]) => (
					<VirtualRefinement key={key} attribute={key} value={value} />
				))} */}

			{/* Hide archived results unless told otherwise */}
			{/* {!showArchived && (
				<VirtualToggle
					attribute="isArchived"
					value={false}
					defaultRefinement={true}
					label="Hide Archived"
				/>
			)} */}

			{/* render children (using renderProps if applicable) */}
			{isRenderFn ? <Results>{children}</Results> : children}
		</InstantSearch>
	)
}

export default StatelessSearchWrapper
