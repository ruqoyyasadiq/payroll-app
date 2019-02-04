const express = require('express')
const reportController = require('../controllers/report.controller')

const reportRouter = express.Router()

reportRouter.get('/new', reportController.uploadTimeReport)

module.exports = reportRouter
