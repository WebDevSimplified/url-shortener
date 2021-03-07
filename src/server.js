require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = 5000

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(require('./routes'))

app.listen(process.env.PORT || PORT)
console.log(`Running on port ${PORT}`)