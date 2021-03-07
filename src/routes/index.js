const express = require('express')
const ShortnerController = require('../controller/ShortenController')
const routes = new express.Router()

routes.get('/', ShortnerController.index)
routes.post('/shortUrls', ShortnerController.store)
routes.get('/:shortUrl', ShortnerController.clickedLink)

module.exports = routes