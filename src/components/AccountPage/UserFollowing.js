import React from "react"
import EmptyState from "../EmptyState"
import { EMPTY_STATES } from "../../constants"

const UserFollowing = ({ following }) => (
	<div>
		{following && following.length > 0 ? (
			<h3>Opinie</h3>
		) : (
			<EmptyState state={EMPTY_STATES.UserNoFollowing} />
		)}
	</div>
)

export default UserFollowing
