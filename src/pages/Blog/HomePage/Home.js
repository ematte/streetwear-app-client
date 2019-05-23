import React from "react"

import { CONST } from "../../../constants"
import route from "../../../utils/route"

import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import { SmallDropCard } from "../../../components/Cards"

import Group from "./Group"
import PromotedSection from "./PromotedSection"
import { SmallPost } from "../Previews"

const ThematicGroup = ({
	limit = 3,
	index,
	title,
	refinements,
	linkTo,
	component: C
}) => {
	return (
		<StatelessSearchWrapper indexName={index} limit={limit} refinements={refinements}>
			{(results) => {
				console.log(`group ${title} results: `, results)
				return results.length > 0 ? (
					<Group title={title} hasMore linkTo={linkTo}>
						{results.map((res) => (
							<C {...res} />
						))}
					</Group>
				) : null
			}}
		</StatelessSearchWrapper>
	)
}

const BlogHomePage = () => {
	return (
		<>
			<PromotedSection />
			<PageContainer>
				<ThematicGroup
					index={CONST.BLOG_DROP_ALGOLIA_INDEX}
					title="Nadchodzące Dropy"
					linkTo={route("BLOG_DROPS")}
					component={SmallDropCard}
				/>
				<ThematicGroup
					index={CONST.BLOG_POST_ALGOLIA_INDEX}
					title="Czyszczenie i Pielęgnacja"
					linkTo={route("BLOG_ARTICLES", null, { tag: "Czyszczenie i Pielęgnacja" })}
					component={SmallPost}
					refinements={{ tags: ["Czyszczenie i Pielęgnacja"] }}
				/>
			</PageContainer>
		</>
	)
}

export default BlogHomePage
