const dataSensorsRoutes = require('./data-sensors')
const userRoutes = require('./user')
const babyphoneRoutes = require('./babyphone')

module.exports = function(app) {
  dataSensorsRoutes(app)
  userRoutes(app)
  babyphoneRoutes(app)
}
