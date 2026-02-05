const express = require('express')
const multer = require('multer')
const router = express.Router()
const postController = require('../../controllers/post.controller.cjs')
const auth = require("../../middlewares/auth.cjs")

router.get('/', auth, postController.getPosts)

module.exports = router;