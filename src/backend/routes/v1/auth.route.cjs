const express = require('express');
const validate = require('../../middlewares/validate.cjs')
const authValidation = require('../../validations/auth.validation.cjs')
const authController = require('../../controllers/auth.controller.cjs');
const postController = require('../../controllers/post.controller.cjs');
const auth = require('../../middlewares/auth.cjs');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.get('/feed', auth, postController.getFeed);
router.post('/logout', authController.logout);

module.exports = router;