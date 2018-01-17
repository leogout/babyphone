const dataSensorsRoutes = require('./data-sensors')
const videoRoutes = require('./video')
const userRoutes = require('./user')
const babyphoneRoutes = require('./babyphone')

module.exports = function(app) {
  dataSensorsRoutes(app)
  videoRoutes(app)
  userRoutes(app)
  babyphoneRoutes(app)
}
