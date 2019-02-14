const Report = require('../models').Report
const models = require('../models')
const parseTimeReport = require('../lib/time_report_parser')
const timeReportProcessor = require('../lib/time_report_processor')

class reportController {
  /**
   * @description uploads new time report, fetch multiple reports or specified individual report
   * @param {object} req - request fron the client to the server 
   * @param {object} res - response fron the server to the client
   */
  static uploadTimeReport(req, res) {
    parseTimeReport(req.file.path).then(data => {
      const { reportID, processedTimeReport } = data
      Report.findOne({
        where: { reportID }
      }).then(report => {
        if(report) {
          return res.status(409).json({
            message: `Records exist for reportID ${reportID}.`
          })
        } else {
          return Report
            .bulkCreate(processedTimeReport)
            .then(() => res.status(200).json({ message: 'Successfully uploaded Time Report.' }))
            .catch(error => res.status(500).json({ error }))
        }
      })
    })
  }

  static fetchAllTimeReports(req, res) {
    Report.findAll({
      attributes: ['employeeId', 'hoursWorked', 'jobGroup', 'dateWorked']
    }).then(data => {
      const report = data.map(resp => resp.dataValues)
      const result = timeReportProcessor(report)
      res.status(200).json({ result })
    }).catch(error => res.status(500).json({ error }))
  }
}

module.exports = reportController
