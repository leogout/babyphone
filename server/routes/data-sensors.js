const DataSensor = require('../models/DataSensor')
const rbody = require('../services/response-body')

module.exports = function(app) {
  app.get('/data-sensors', function(req, res) {

    if (!req.user)
      return res.json(401, rbody.error('Unauthorized.'))

    DataSensor.find({babyphone: req.user.babyphone})
      .then(sensors => {
        res.json(200, rbody.success(null, { sensors }))
      }).catch(err => {
        res.json(409, rbody.error('Failed datasensor fetching from database.'))
      })
  })

  app.post('/data-sensors', function(req, res) {
    if (!req.user)
      return res.send(403, rbody.error('Unauthorized.'))

    const newDataSensor = new DataSensor({
      savedAt: req.body.savedAt,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      gyroscope: req.body.gyroscope,
      babyphone: req.user.babyphone
    })

    newDataSensor.save().then(sensor => {
      res.json(200, rbody.success('Successfully created data sensor.', { sensor }))
    }).catch(err => {
      res.send(422, rbody.error('An error occured on our side, please retry later.'))
    })
  })
}