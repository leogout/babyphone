const dataSensorsRoutes = require('./data-sensors')
const babyphonesRoutes = require('./babyphones')
const userRoutes = require('./user')

module.exports = function(app) {
  dataSensorsRoutes(app)
  babyphonesRoutes(app)
  userRoutes(app)
}
