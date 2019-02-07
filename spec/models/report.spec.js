const  chai = require('chai')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.use(sinonChai)

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const ReportModel = require('../../src/models/Report')

describe('src/models/Report', () => {
  const Report = ReportModel(sequelize, dataTypes)
  const report = new Report()

  checkModelName(Report)('Report')

  context('check valid properties', () => {
    ;[
      'reportID',
      'employeeId',
      'hoursWorked',
      'jobGroup',
      'dateWorked',
    ].forEach(checkPropertyExists(report))
  })
})