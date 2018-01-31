const jwtConf = require('../config/jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Babyphone = require('../models/Babyphone')
const rbody = require('../services/response-body')

module.exports = function(app) {
  app.post('/signup', (req, res) => {
    const { email, password, serial } = req.body

    if (!email || !password || !serial)
      return res.json(400, rbody.error('Please provide an email, password and serial.'))

    Babyphone.findOne({ serial: serial })
      .then(babyphone => {

        if (!babyphone)
          res.json(409, rbody.error('Can\'t find associated babyphone.'))

        const newUser = new User({
          email: email,
          password: password,
          babyphone: babyphone
        })

        newUser.save().then(user => {
          const token = jwt.sign({ email: user.email }, jwtConf.secret)

          res.json(200, rbody.success('Created new user.', { token, video_url: babyphone.url }))
        }).catch(err => {
          res.json(409, rbody.error('The user email is already used by another account.'))
        })
      })
      .catch(err => {
        res.json(409, rbody.error('Error while finding babyphone.'))
      })
  })

  app.post('/signin', (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .populate('babyphone')
    .then(user => {
      if (!user)
        return res.send(400, rbody.error('Email not found.'))

      if (!user.comparePassword(req.body.password))
        return res.send(400, rbody.error('Wrong password.'))

      const token = jwt.sign({ email: user.email }, jwtConf.secret)

      res.json(200, rbody.success('User signed in.', { token, video_url: user.babyphone.url }))
    }).catch(err => {
      res.send(422, rbody.error('An error occured on our side, please retry later.'))
    })
  })
}
