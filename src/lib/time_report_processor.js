const jobGroupWagesMapping = require('../constants')

const numDaysBetween = function(d1, d2) {
  var diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

const timeReportProcessor = data => {/**
  * @description timeReportProcessor - processes all time report entries from Reports table by reduction method
  * @param {string} data - data from the Reports table
  * @return Object of objects hash with key being the employeeID and each value being an object of pay period and amount paid
  */
  return data.reduce((acc, val) => {
    let dateKey = ''
    const singleDateArray = val.dateWorked.split('-')
    const workDay = new Date(singleDateArray[0], singleDateArray[1]-1, singleDateArray[2]);
    const firstDayOfMonth = new Date(singleDateArray[0], singleDateArray[1]-1)
    const daysBetween = numDaysBetween(workDay, firstDayOfMonth)

    if (daysBetween < 15) {
      dateKey = `1/${singleDateArray[1]}/${singleDateArray[0]} - 15/${singleDateArray[1]}/${singleDateArray[0]}`
    }
    else {
      dateKey = `16/${singleDateArray[1]}/${singleDateArray[0]} - 30/${singleDateArray[1]}/${singleDateArray[0]}`
    }

    if(!acc[val.employeeId]) {
      acc[val.employeeId] = [{
        datePeriod: dateKey,
        amountPaid: 0,
        employeeId: val.employeeId
      }]
    }

    const employeeIndex = acc[val.employeeId].findIndex(e => e.datePeriod === dateKey);
    if (employeeIndex > -1) {
      acc[val.employeeId][employeeIndex].amountPaid = acc[val.employeeId][employeeIndex].amountPaid + ( jobGroupWagesMapping[val.jobGroup] * val.hoursWorked)
    }
    else {
      acc[val.employeeId] = acc[val.employeeId].concat({
        datePeriod: dateKey,
        employeeId: val.employeeId,
        amountPaid: jobGroupWagesMapping[val.jobGroup] * val.hoursWorked
      })
    }
    return acc
  }, {})
}

module.exports = timeReportProcessor
