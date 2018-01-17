const jwtConf = require('../config/jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Babyphone = require('../models/Babyphone')
const rbody = require('../services/response-body')
const request = require('request')

module.exports = function(app) {
  app.get('/video', (req, res) => {
    request('http://iris.not.iac.es/axis-cgi/mjpg/video.cgi').pipe(res)
  })
}
