const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();
const url =
	"mongodb+srv://Abhi:wWPPi5LuIU5d5agp@cluster0.752vz.mongodb.net/?retryWrites=true&w=majority" ||
	process.env.MONGO_URI;
app.use(express.urlencoded({ extended: true }));
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
	const shorturl = await ShortUrl.find();
	res.render("index", { shorturl: shorturl });
});
app.get("/:short", async (req, res) => {
	const short = await ShortUrl.findOne({ short: req.params.short });
	if (short == null) {
		return res.sendStatus(404);
	}
	short.click++;
	console.log(short);
	short.save();
	res.redirect(short.fullUrl);
});
app.post("/shortUrls", async (req, res) => {
	await ShortUrl.create({ fullUrl: req.body.fullUrl });
	res.redirect("/");
});
app.listen(port, (req, res) => {
	console.log("server started");
});
