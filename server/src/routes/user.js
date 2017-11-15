const passport = require('passport')
const config = require('../config/db')
require('../config/auth')(passport)
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Babyphone = require('../models/Babyphone')

module.exports = function(app) {
  app.post('/signup', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.serial) {
      res.json({success: false, msg: 'Please pass email, password and serial.'})
    } else {
      const newBabyphone = new Babyphone({
        serial: req.body.serial
      })

      newBabyphone.save().then((babyphone) => {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          babyphone: babyphone._id
        })
        // save the user
        return newUser.save()
      })
      .then((user) => {
        res.json({success: true, msg: 'Created new user.'})
      }).catch((err) => {
        res.json({success: false, msg: 'An error occured while creating user.'})
      })
    }
  })

  app.post('/signin', (req, res) => {
    User.findOne({
      email: req.body.email
    }).then((user) => {
      if (!user) {
        return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign({email: user.email}, config.secret)
          // return the information including token as JSON
          res.json({success: true, token: token})
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
        }
      })
    }).catch(err => {
      throw err
    })
  })
}
