const passport = require('passport')
require('../config/auth').configurePassport(passport)
const getToken = require('../config/auth').getToken
const DataSensor = require('../models/DataSensor')

module.exports = function(app) {
  app.get('/data-sensors', passport.authenticate('jwt', { session: false }), function(req, res) {
    const token = getToken(req.headers)

    if (!token) {
      return res.status(403).send({success: false, msg: 'Unauthorized.'})
    }

    DataSensor.find({babyphone: req.user.babyphone})
      .then((dataSensors) => {
        res.json({success: true, msg: '', items: dataSensors})
      }).catch((err) => {
        res.json({success: false, msg: 'Get datasensors failed.'})
      })
  })

  app.post('/data-sensors', passport.authenticate('jwt', { session: false }), function(req, res) {
    const token = getToken(req.headers)

    if (!token) {
      return res.status(403).send({success: false, msg: 'Unauthorized.'})
    }

    const newDataSensor = new DataSensor({
      savedAt: req.body.savedAt,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      gyroscope: req.body.gyroscope,
      babyphone: req.user.babyphone
    })

    newDataSensor.save().then((dataSensor) => {
      res.json({success: true, msg: 'Successful created new datasensor.'})
    }).catch((err) => {
      res.json({success: false, msg: 'Save datasensor failed.'})
    })

  })
}