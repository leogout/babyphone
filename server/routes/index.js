const dataSensorsRoutes = require('./data-sensors')
const userRoutes = require('./user')

module.exports = function(app) {
  dataSensorsRoutes(app)
  userRoutes(app)
}
