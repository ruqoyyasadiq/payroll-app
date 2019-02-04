const csv = require('csvtojson')
const fs = require('fs')

const parseTimeReport = (csvFilePath, cb) => {
  return csv({
    checkType: true
  })
  .fromFile(csvFilePath)
  .then(timeReportArray => {
    const timeReportLastRow = timeReportArray.splice(-1, 1)[0]
    if (timeReportLastRow['date'] != 'report id' || typeof(timeReportLastRow['hours worked']) != 'number') {
      throw new Error('Invalid Time Report. Missing Report ID!')
    }
    const reportID = timeReportLastRow['hours worked']
    const processedTimeReport = timeReportArray.map(entry => {
      const row = {}
      row['reportID'] = reportID,
      row['hoursWorked'] = entry['hours worked'],
      row['jobGroup'] = entry['job group'],
      row['employeeId'] = entry['employee id'],
      row['date'] = entry['date']
      return row
    })
    return { reportID, processedTimeReport }
  })
}
module.exports = parseTimeReport
