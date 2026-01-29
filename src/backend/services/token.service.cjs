const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config/config.cjs')

const generateToken = (userId, expires, type = "ACCESS", secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    }
    return jwt.sign(payload, secret)
}

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpMin, 'minutes')
    const accessToken = generateToken(user._id, accessTokenExpires, 'access');
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        }
    }
}
module.exports = { generateToken, generateAuthTokens }