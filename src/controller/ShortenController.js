const ShortUrl = require('../models/shortUrl')

module.exports = {
    async index(req, res) {
        const shortUrls = await ShortUrl.find()
        res.render('index', { shortUrls: shortUrls })
    },
    async store(req, res) {
        const { fullUrl } = req.body

        await ShortUrl.create({ full: fullUrl })
        res.redirect('/')
    },
    async clickedLink(req, res) {
        const { shortUrl } = req.params
        const shorten = await ShortUrl.findOne({ short: shortUrl })
        if (shorten == null) return res.sendStatus(404)

        shorten.clicks++
        shorten.save()

        res.redirect(shorten.full)
    }
}