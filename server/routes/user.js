const jwtConf = require('../config/jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Babyphone = require('../models/Babyphone')

module.exports = function(app) {
  app.post('/signup', (req, res) => {
    const { email, password, serial } = req.body

    if (!email || !password || !serial)
      return res.json({success: false, msg: 'Please pass email, password and serial.'})

    const newBabyphone = new Babyphone({
      serial: serial
    })

    const newUser = new User({
      email: email,
      password: password,
      babyphone: newBabyphone
    })

    newUser.save().then(user => {
      return res.json({success: true, msg: 'Created new user.', user})
    }).catch(err => {
      return res.json({success: false, msg: 'An error occured while creating user.'})
    })
  })

  app.post('/signin', (req, res) => {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (!user)
        return res.status(401).send({success: false, msg: 'User not found.'})

      if (!user.comparePassword(req.body.password))
        return res.status(401).send({success: false, msg: 'Wrong password.'})

      const token = jwt.sign({ email: user.email }, jwtConf.secret)

      return res.json({success: true, token, user})
    }).catch(err => {
      return res.status(401).send({success: false, msg: 'An error occured.'})
    })
  })
}
