const express = require('express');
const validate=require('../../middlewares/validate.cjs')
const authValidation=require('../../validations/auth.validation.cjs')
const authController = require('../../controllers/auth.controller.cjs');
// const auth = require('../../middlewares/auth');

const router = express.Router();
console.log("In auth.route.js, calling auth.controller.js")
router.post('/register', validate(authValidation.register), authController.register);

module.exports=router;