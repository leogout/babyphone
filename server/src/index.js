const express     = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser  = require('body-parser')
const app         = express()
const dbConf          = require('./config/db')
const routes      = require('./routes')
app.use(bodyParser.urlencoded({ extended: true }))

const port = 8000


MongoClient.connect(dbConf.url, (err, db) => {
  if (err) return console.log(err)
  // registers routes
  routes(app, db)

  app.listen(port, () => {
    console.log('We are live on ' + port);
  })
})
