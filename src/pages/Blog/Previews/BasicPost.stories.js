import React from "react"
import { storiesOf } from "@storybook/react"
import BasicPost from "./BasicPost"
import StoryRouter from "storybook-react-router"
import themeDecorator from "../../../storybook-decorators/theme"

const mockedPost = {
	id: "some_id",
	section: "Artykuły",
	title: "Lorem ipsum dolor sit amet",
	mainContent:
		"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
	mainImageRef: "",
	mainImageURL: "https://picsum.photos/850/520",
	createdAt: 1554666539028,
	editedAt: null,
	comments: [],
	author: "Krzysiu",
	tags: ["Nike", "Buty", "Lorem Ipsum", "Dolor", "Sit Amet"]
}

storiesOf("BasicPost", module)
	.addDecorator(themeDecorator)
	.addDecorator(StoryRouter())
	.add("default", () => <BasicPost {...mockedPost} />)