const DataSensor = require('../models/DataSensor')

module.exports = function(app) {
  app.get('/data-sensors', function(req, res) {

    if (!req.user) {
      return res.status(403).send({success: false, msg: 'Unauthorized.'})
    }

    DataSensor.find({babyphone: req.user.babyphone})
      .then((dataSensors) => {
        res.json({success: true, msg: '', items: dataSensors})
      }).catch((err) => {
        res.json({success: false, msg: 'Get datasensors failed.'})
      })
  })

  app.post('/data-sensors', function(req, res) {
    if (!req.user) {
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