const mongoose = require("mongoose");
const shortId = require("shortid");
const shortUrlSchema = new mongoose.Schema({
	fullUrl: {
		type: String,
		required: true,
	},
	short: {
		type: String,
		required: true,
		default: shortId.generate,
	},
	click: {
		type: Number,
		required: true,
		default: 0,
	},
});
module.exports = new mongoose.model("ShortUrl", shortUrlSchema);
