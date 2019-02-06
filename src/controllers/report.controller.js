const Report = require('../models').Report
const models = require('../models')
const parseTimeReport = require('../lib/time_report_parser')

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
            .then(() => {
              return Report.findAll({
                where: { reportID },
                group: ['employeeId']
              }).then(response => {
                const result = response.map(data => data.dataValues)
                res.status(200).json({ result })
              })
            })
            .catch(error => res.status(500).json({ error }))
        }
      })
    })
  }

  static fetchTimeReport(req, res) {
    // do something
  }

  static fetchAllTimeReports(req, res) {
    // do something
  }
}

module.exports = reportController
