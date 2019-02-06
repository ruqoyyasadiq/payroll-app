const express = require('express')
const reportController = require('../controllers/report.controller')
const multer = require('multer') // for processing file uploads

/**
 * set temporary destination for csv uploads to backend.
 * TODO: move files to appropriate (remote) storage after reading from csv.
 */
const upload = multer({ dest:'./uploads/' })

const reportRouter = express.Router()

reportRouter.post('/new', upload.single('uploadCsv'),  reportController.uploadTimeReport)
reportRouter.get('/:id', reportController.fetchTimeReport)
reportRouter.get('/', reportController.fetchAllTimeReports)

module.exports = reportRouter
