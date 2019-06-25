import React from "react"
import { withRouter } from "react-router"

import { CONST } from "../../../constants"

import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import PageNav from "../../../components/PageNav"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PoweredByBox } from "../../../components/Algolia/PoweredBy"
import { PopularArticles, PopularTags } from "../../../components/SidebarComponents"

import { Heading } from "../common"
import InfinitePosts from "../InfinitePostsList"

const sidebarElements = [
	{ title: "Popularne artykuły", component: PopularArticles },
	{ title: "Popularne tagi", component: PopularTags }
]

const BlogCategoryPage = ({ match }) => {
	const { category } = match.params

	return (
		<StatelessSearchWrapper
			indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
			refinements={{ category }}
			hitsPerPage={6}
		>
			<PageContainer>
				<LayoutManager>
					<Main>
						<PageNav breadcrumbs={[["Czytaj", "BLOG_HOME"]]} noMargin />
						<Heading category={category}>{category}</Heading>
						<InfinitePosts />
					</Main>
					<Sidebar availableElements={sidebarElements} isRandom>
						<PoweredByBox />
					</Sidebar>
				</LayoutManager>
			</PageContainer>
		</StatelessSearchWrapper>
	)
}

export default withRouter(BlogCategoryPage)