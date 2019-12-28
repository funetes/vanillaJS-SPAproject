const express = require('express')
const cors = require('cors')
const routes = require('./routes')

// Make an express app
const app = express()

// Use middlewares
app.use(cors())
app.use(express.static('public'))
app.use('/api', routes)

module.exports = app
