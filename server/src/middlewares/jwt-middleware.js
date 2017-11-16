const _ = require('lodash')
const User = require('../models/User')
const jsonwebtoken = require('jsonwebtoken')
const jwtConf = require('../config/jwt')

module.exports = (req, res, next) => {
  const authorization = _.get(req, 'headers.authorization')

  if (!authorization)
    return next()

  const authParts = authorization.split(' ')
  const bearer = authParts[0]
  const token = authParts[1]

  if (bearer !== 'Bearer')
    return next()

  jsonwebtoken.verify(token, jwtConf.secret, (err, decoded_token) => {
    if (err)
      return next()

    User.findOne({ email: decoded_token.email }).then(user => {
      req.user = user
      next()
    })
  })
}