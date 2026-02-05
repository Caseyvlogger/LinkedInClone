const express = require('express')
const router = express.Router()
const postController = require('../../controllers/post.controller.cjs')
const auth = require("../../middlewares/auth.cjs")

router.get('/', auth, postController.getPosts)

module.exports = router;