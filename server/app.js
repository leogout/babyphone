const express = require('express')
const mongoose = require('mongoose')
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

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise
mongoose.connect(dbConf.url, { useMongoClient: true })
mongoose.connection.on('error', (err) => {
  console.error(err)
  // console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
  process.exit()
})

registerRoutes(app)

app.listen(port, () => {
  console.log('Babyphone server runs on port ' + port)
})

module.exports = app
