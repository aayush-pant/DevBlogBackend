const express = require('express')

const router = express.Router()
const controller = require('../controllers/controller')

router.get('/blogs', controller.getblogs)

module.exports = router