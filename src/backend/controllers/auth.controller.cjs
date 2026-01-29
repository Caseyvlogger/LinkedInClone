const httpStatus = require('http-status')
const { userService, tokenService, authService } = require('../services/index.cjs'); // Adjust path if needed

const register = async (req, res) => {
    const user = await userService.createUser(req.body)
    const tokens = await tokenService.generateAuthTokens(user)
    res.status(httpStatus.status.CREATED).send({ user, tokens })
};

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user)
    res.status(201).send({ user, tokens });
};

module.exports = { register, login };