const express = require('express')

const {
   generate,
   textToGraph,
   pathfinding
} = require('../controller/graphCtrl')

const router = express.Router()

router.post('/generate', generate)

router.post('/text-to-graph', textToGraph)

router.post('/pathfinding', pathfinding)

module.exports = router;