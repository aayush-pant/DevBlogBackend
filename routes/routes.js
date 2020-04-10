const express = require('express')

const router = express.Router()
const controller = require('../controllers/controller')

router.get('/blogs', controller.getAllBlogs)

router.get('blog/:id', controller.getBlogById)

module.exports = router