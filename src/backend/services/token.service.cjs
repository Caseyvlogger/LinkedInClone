const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config/config.cjs')

const generateToken = (userId, expires, type = "access", secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    }
    return jwt.sign(payload, secret)
}

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpMin, 'minutes') //1440 eq. to 1d
    const accessToken = generateToken(user._id, accessTokenExpires, 'access');
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        }
    }
}
module.exports = { generateToken, generateAuthTokens }