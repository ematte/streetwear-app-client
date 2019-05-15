import shortid from "shortid"
import moment from "moment"

import isSet from "./isSet"
import { formatInt, formatNonEmptyArray, formatString } from "./basicsUtils"

export const MODE = {
	CREATE: "CREATE",
	EDIT: "EDIT",
	ARCHIVE: "ARCHIVE"
}

export const REQUIRED = [
	"name",
	"description",
	"dropsAtString",
	"designers",
	"itemCategory",
	"attachments",
	"mainImageIndex"
]

export const dateFormat = "YY-MM-DD HH:mm"

export const formatDropDataForDb = (data, mode, flagState = true) => {
	let formatted = {}

	// check if all required values are present while creating
	if (mode === MODE.CREATE) {
		for (const field of REQUIRED) {
			if (!data[field]) {
				throw new Error("missing required data in: " + field)
			}
		}
	}

	// format incoming values
	if ([MODE.CREATE, MODE.EDIT].includes(mode)) {
		// name
		if (isSet(data.name)) {
			formatted.name = formatString(data.name)
		}

		// description
		if (isSet(data.description)) {
			formatted.description = formatString(data.description)
		}

		// dropsAtString
		if (isSet(data.dropsAtString)) {
			formatted.dropsAtString = formatString(data.dropsAtString)
		}

		// dropsAtApproxTimestamp
		if (isSet(data.dropsAtString)) {
			// generate approximate timestamp for sorting purposes
			const dropsAtApproxTimestamp = moment(data.dropsAtString, dateFormat).valueOf()

			formatted.dropsAtApproxTimestamp = dropsAtApproxTimestamp
		}

		// designers
		if (isSet(data.designers)) {
			formatted.designers = formatNonEmptyArray(data.designers)
		}

		// itemCategory
		if (isSet(data.itemCategory)) {
			// it's called itemCategory to avoid collision with Post attribute category
			formatted.itemCategory = formatString(data.itemCategory)
		}

		// price
		if (isSet(data.price)) {
			formatted.price = formatInt(data.price)
		}

		// howMany
		if (isSet(data.howMany)) {
			formatted.howMany = formatString(data.howMany)
		}

		// attachments
		if (isSet(data.attachments)) {
			formatted.attachments = formatNonEmptyArray(data.attachments)
		}

		// mainImageIndex
		if (isSet(data.mainImageIndex)) {
			// the minimum/default index is 0
			formatted.mainImageIndex = Math.max(0, formatInt(data.mainImageIndex))
		}

		// buyAt
		if (isSet(data.buyAt)) {
			// array, can be empty
			formatted.buyAt = data.buyAt
		}
	}

	if (mode === MODE.CREATE) {
		formatted.id = shortid.generate()

		formatted.createdAt = Date.now()
		formatted.editedAt = Date.now()

		formatted.isArchived = false
	}

	if (mode === MODE.EDIT) {
		formatted.editedAt = Date.now()
	}

	if (mode === MODE.ARCHIVE) {
		formatted.isArchived = flagState
	}

	return formatted
}