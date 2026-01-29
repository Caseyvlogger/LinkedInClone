const httpStatus = require("http-status")
const userService = require('../services/user.service.cjs')
const ApiError = require('../utils/ApiError.js')
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email); //get from MongoDB
  if (!user || !(await user.isPasswordMatch(password))) { //Schema method for checking password with bcrypt
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

module.exports = { loginUserWithEmailAndPassword }