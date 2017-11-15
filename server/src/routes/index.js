const babyphoneRoutes = require('./babyphone')

module.exports = function(app, db) {
  babyphoneRoutes(app, db)
}
