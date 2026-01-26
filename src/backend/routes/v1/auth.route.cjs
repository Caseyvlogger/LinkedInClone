const express = require('express');
// const validate = require('../../middlewares/validate');
// const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller.cjs');
// const auth = require('../../middlewares/auth');

const router = express.Router();
console.log("In auth.route.js, calling auth.controller.js")
router.post('/register', authController.register);

module.exports=router;