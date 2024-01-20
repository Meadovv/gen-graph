const express = require('express')

const {
   generate,
   textToGraph,
   pathfinding,
   tracePath,
   createFileContent
} = require('../../controller/v1/graph.controller')

const router = express.Router()

router.post('/generate', generate)

router.post('/text-to-graph', textToGraph)

router.post('/pathfinding', pathfinding)

router.post('/trace', tracePath)

router.post('/create-file', createFileContent)

module.exports = router;