const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = Promise
const urlencodedParser = require('body-parser').urlencoded({ extended: true })
const dbConf = require('./config/db')
const registerRoutes = require('./routes')
const jwt = require('./middlewares/jwt')
const cors = require('./middlewares/cors')
const app = express()

app.use(urlencodedParser)
app.use(cors)
app.use(jwt)

const port = 8000

mongoose.connect(dbConf.url, { useMongoClient: true }).then(() => {
  registerRoutes(app)

  app.listen(port, () => {
    console.log('Babyphone server runs on port ' + port)
  })
}, err => {
  console.log(err)
})
