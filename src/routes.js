const express = require('express')
const reportRoutes = require('./routes/report.route')

const routes = () => {
  const router = express.Router()
  router.use('/reports', reportRoutes)
  return router
}

module.exports = routes