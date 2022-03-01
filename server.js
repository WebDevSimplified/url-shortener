const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect(process.env['MONGO_URI'], {
	useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const sort = req.query.sort || 'desc';
	
	const shortUrls = await ShortUrl.find({ ip: ip }).sort({ createdAt: sort }).exec()
	res.render('index', { shortUrls: shortUrls })
})

app.post('/shorten', async (req, res) => {
	var fullUrl = req.body.fullUrl
	const shortUrl = req.body.shortUrl || undefined
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	const exists = await ShortUrl.find({ short: shortUrl })

	if (!fullUrl.includes('http')) {
		fullUrl = 'http://' + fullUrl
	}

	console.log(exists)
	
	if (exists.length < 1) {
		await ShortUrl.create({ full: fullUrl, short: shortUrl, ip: ip })
		res.redirect('/')
	} else {
		res.redirect('/' + '?err=409')
	}
})

app.get('/:shortUrl', async (req, res) => {
	const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
	if (shortUrl == null) return res.sendStatus(404)

	shortUrl.clicks++
	shortUrl.save()

	// res.redirect(shortUrl.full)
	res.render('redirect', { url: shortUrl.full })
})

app.get('/delete/:shortUrl', async (req, res) => {
	const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
	if (shortUrl == null) return res.sendStatus(404)
	
	await ShortUrl.findOneAndDelete({ short: req.params.shortUrl })
	
	res.redirect('/')
})

app.listen(process.env.PORT || 5000);
