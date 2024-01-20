const express = require('express')
const router = express.Router()
const graphRoute = require('./graph.router')

router.use('/graph', graphRoute)

module.exports = router