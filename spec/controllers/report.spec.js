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

  // TODO: Complete spec
  
  describe('Get Reports Endpoint /v1/reports', () => {
    // it('should display the right message when no report entry is available', done => {
    //   request(app)
    //     .get('/v1/reports')
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /json/)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200)
    //       expect(res.body.message).to.equal('No Report available. Start by creating report entries.')
    //       done()
    //     })
    // })

    // it('should return a success message on successful bulk create', (done) => {
    //   dataPath = '../../sample.csv'

    //   request(app)
    //     .post('/v1/reports/new', dataPath)
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /json/)
    //     .end((err, res) => {
    //       console.log(res, 'res in spec')
    //       expect(res.status).to.equal(200)
    //       expect(res.body.results.length).to.equal(2)
    //       expect(res.body.results[0].name).to.equal('Test User1')
    //       expect(res.body.results[1].email).to.equal('test.user2@influitive.com')
    //       expect(res.body.results[1].points).to.equal(500)
    //       done()
    //     })
    // })
  })
})
