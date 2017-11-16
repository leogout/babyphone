const babyphoneRoutes = require('./babyphone')
const userRoutes = require('./user')

module.exports = function(app) {
  babyphoneRoutes(app)
  userRoutes(app)
}
