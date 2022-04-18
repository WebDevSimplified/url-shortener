const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  ip: {
    type: String,
    required: true
  },
 //  timestamp: {
 //    type: String,
 //    required: true,
	// default: new Date()
 //  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },

	
  filename: {
    type: String,
    required: true,
	default: ''
  },
}, { timestamps: true })

module.exports = mongoose.model('ShortUrl', shortUrlSchema)