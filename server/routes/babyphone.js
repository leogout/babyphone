const Babyphone = require('../models/Babyphone')
const rbody = require('../services/response-body')

module.exports = function(app) {
  app.post('/babyphone', (req, res) => {
    const { url, serial } = req.body

    const newBabyphone = new Babyphone({
      serial: serial,
      url: url
    })

    newBabyphone.save().then(babyphone => {
      res.json(200, rbody.success(null, { babyphone }))
    }).catch(err => {
      res.json(409, rbody.error('An error occured.'))
    })

    /*Babyphone
      .findOneAndUpdate({ serial: serial }, { url: url })
      .then(babyphone => {

        res.json(200, rbody.success(null, { babyphone }))
      })*/
  })
}
