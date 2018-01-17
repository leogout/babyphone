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
        const newUser = new User({
          email: email,
          password: password,
          babyphone: babyphone
        })

        newUser.save().then(user => {
          const token = jwt.sign({ email: user.email }, jwtConf.secret)

          res.json(200, rbody.success('Created new user.', { token }))
        }).catch(err => {
          res.json(409, rbody.error('The user email or the babyphone\'s serial are already used by another account.'))
        })
      })
      .catch(err => {
        res.json(409, rbody.error('Can\'t find associated babyphone.'))
      })
  })

  app.post('/signin', (req, res) => {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (!user)
        return res.send(400, rbody.error('User with this email not found.'))

      if (!user.comparePassword(req.body.password))
        return res.send(400, rbody.error('Wrong password.'))

      const token = jwt.sign({ email: user.email }, jwtConf.secret)

      res.json(200, rbody.success('User signed in.', { token }))
    }).catch(err => {
      res.send(422, rbody.error('An error occured on our side, please retry later.'))
    })
  })
}
