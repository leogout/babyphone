const express    = require('express')
const mongoose   = require('mongoose')
mongoose.Promise = Promise
const bodyParser = require('body-parser')
const dbConf     = require('./config/db')
const routes     = require('./routes')
const jwt        = require('./middlewares/jwt-middleware')
const app        = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(jwt)

const port = 8000

mongoose.connect(dbConf.url, { useMongoClient: true }).then((db) => {
  routes(app)

  app.listen(port, () => {
    console.log('We are live on ' + port)
  })
}, (err) => {
  console.log(err)
})
