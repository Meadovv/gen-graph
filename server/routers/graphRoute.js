const express = require('express')

const {
   generate,
   textToGraph,
   pathfinding,
   tracePath
} = require('../controller/graphCtrl')

const router = express.Router()

router.post('/generate', generate)

router.post('/text-to-graph', textToGraph)

router.post('/pathfinding', pathfinding)

router.post('/trace', tracePath)

module.exports = router;