import shortid from "shortid"

export default class CustomFile {
	constructor(params) {
		this.id = shortid.generate()
		this.ref = params.ref || ""
		this.previewUrl = params.previewUrl || ""
		this.data = params.data || {}
		this.isUploaded = params.isUploaded || false
	}
}
