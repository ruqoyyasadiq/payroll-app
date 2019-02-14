const request = require('supertest')
const { expect } = require('chai')
const app = require('../../src/server')
const Report = require('../../src/models').Report

describe('Reports Endpoints /v1/reports', () => {
  beforeEach((done) => {
    Report.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true
    }).then(() => { done() })
  })
  
  describe('Upload TimeReport Endpoint /v1/reports/new', () => {
    it('should return a success message on successful bulk create', (done) => {
      dataPath = './sample.csv'

      request(app)
        .post('/v1/reports/new', dataPath)
        .set('Content-Type', 'multipart/form-data')
        .attach('uploadCsv', dataPath)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).to.equal('Successfully uploaded Time Report.')
          done()
        })
    })
  })

  describe('Fetch all Time Reports available in the database', () => {
    Report.bulkCreate([
      { reportID: 23,
        employeeId: 1,
        jobGroup: 'A',
        dateWorked: '10/12/2016',
        hoursWorked: 7
      },
      { reportID: 23,
        employeeId: 1,
        jobGroup: 'A',
        dateWorked: '11/12/2016',
        hoursWorked: 4
      },
      { reportID: 23,
        employeeId: 1,
        jobGroup: 'A',
        dateWorked: '12/12/2016',
        hoursWorked: 6.5
      },
      { reportID: 23,
        employeeId: 2,
        jobGroup: 'B',
        dateWorked: '11/12/2016',
        hoursWorked: 8
      }
    ])
    it('should display the right message when no report entry is available', done => {
      request(app)
        .get('/v1/reports')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.have.property('result')
          done()
        })
    })
  })
})
