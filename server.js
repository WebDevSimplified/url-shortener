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
	
  const shortUrls = await ShortUrl.find({ ip: ip })
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shorten', async (req, res) => {
  var fullUrl = req.body.fullUrl
  const shortUrl = req.body.shortUrl || undefined
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
	
  if (!fullUrl.includes('http')) {
	  fullUrl = 'http://' + fullUrl
  }
  await ShortUrl.create({ full: fullUrl, short: shortUrl, ip: ip })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  // res.redirect(shortUrl.full)
  res.render('redirect', { url: shortUrl.full })
})

app.listen(process.env.PORT || 5000);