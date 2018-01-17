const Babyphone = require('../models/Babyphone')
const rbody = require('../services/response-body')

module.exports = function(app) {
  app.post('/babyphone', (req, res) => {
    const { url, serial } = req.body

    console.log('url:', url, 'serial:', serial)

    Babyphone.findOneAndUpdate({ serial: serial }, { serial: serial, url: url }, { upsert: true })
      .then(babyphone => {
        res.json(200, rbody.success(null, { babyphone }))
      })
      .catch(err => {
        console.log(err)
        res.json(500, rbody.error('An error occured.'))
      })
  })
}
