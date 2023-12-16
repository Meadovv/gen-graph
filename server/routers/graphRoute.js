const express = require('express')

const {
   check,
   generate
} = require('../controller/graphCtrl')

const router = express.Router()

router.post('/generate', generate)

router.post('/check', check)

module.exports = router;