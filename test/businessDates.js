const expect = require('chai').expect;
const request = require('supertest');
let server

//Integration tests for the api
describe.skip('/api/v1/businessDates', () => {
  beforeEach(async () => {
    server = require('../index');
  });
  afterEach(async () => {
    await server.close();
  });

  describe('/GET', () => {

    let initialQuery
    const exec = () => {
      return request(server)
        .get(`/api/v1/businessDates`)
        .send(initialQuery)
    }

    it('should return 400 if initialQuery is missing initialDate', async () => {
      initialQuery = {
        delay: 3
      }
      const res = await exec()
      expect(res.status).to.equal(400)
    })

    it('should return 400 if initialQuery is missing delay', async () => {
      initialQuery = {
        initialDate: "2018-12-12T10:10:10Z"
      }
      const res = await exec()
      expect(res.status).to.equal(400)
    })

    it('should return 200 if query is valid', async () => {
      initialQuery = {
        initialDate: "2018-12-12T10:10:10Z",
        delay: 3
      }
      const res = await exec()
      expect(res.status).to.equal(200)
    })

    it('should return ok === true if query is valid', async () => {
      initialQuery = {
        initialDate: "2018-12-12T10:10:10Z",
        delay: 3
      }
      const res = await exec()
      expect(res.body.ok).to.equal(true)
    })

  })

  describe('/GET - TEST CASES', () => {
    let initialQuery
    let expectedOutput
    const exec = () => {
      return request(server)
        .get(`/api/v1/businessDates`)
        .send(initialQuery)
    }

    it('November 10 2018, delay 3 should return November 15, 2 weekend days and 1 holday', async () => {
      initialQuery = {
        initialDate: '2018-11-10T10:10:10Z',
        delay: 3
      }

      expectedOutput = {
        ok: true,
        initialQuery: {
          initialDate: "2018-11-10T10:10:10Z",
          delay: 3
        },
        results: {
          businessDate: "2018-11-15T10:10:10.000Z",
          totalDays: 6,
          holidayDays: 1,
          weekendDays: 2
        }
      }


      let res = await exec()
      expect(res.body).to.eql(expectedOutput)
    })

    it('November 15 2018, delay 3 should return November 19, 2 weekend days and 0 holdays', async () => {
      initialQuery = {
        initialDate: '2018-11-15T10:10:10Z',
        delay: 3
      }

      expectedOutput = {
        ok: true,
        initialQuery: {
          initialDate: "2018-11-15T10:10:10Z",
          delay: 3
        },
        results: {
          businessDate: "2018-11-19T10:10:10.000Z",
          totalDays: 5,
          holidayDays: 0,
          weekendDays: 2
        }
      }

      let res = await exec()
      expect(res.body).to.eql(expectedOutput)
    })

    //Different from Challenge Statement
    it('December 25 2018, delay 20 should return January 24th, 8 weekend days and 3 holdays', async () => {
      initialQuery = {
        initialDate: '2018-12-25T10:10:10Z',
        delay: 20
      }

      expectedOutput = {
        ok: true,
        initialQuery: {
          initialDate: "2018-12-25T10:10:10Z",
          delay: 20
        },
        results: {
          businessDate: "2019-01-24T10:10:10.000Z",
          totalDays: 31,
          holidayDays: 3,
          weekendDays: 8
        }
      }


      let res = await exec()
      expect(res.body).to.eql(expectedOutput)
    })

  })

  describe('/POST', () => {
    describe('should perform the same as the /GET', () => {

      let initialQuery
      let expectedOutput
      const exec = () => {
        return request(server)
          .post(`/api/v1/businessDates`)
          .send(initialQuery)
      }

      it('November 10 2018, delay 3 should return November 15, 2 weekend days and 1 holday', async () => {
        initialQuery = {
          initialDate: '2018-11-10T10:10:10Z',
          delay: 3
        }

        expectedOutput = {
          ok: true,
          initialQuery: {
            initialDate: "2018-11-10T10:10:10Z",
            delay: 3
          },
          results: {
            businessDate: "2018-11-15T10:10:10.000Z",
            totalDays: 6,
            holidayDays: 1,
            weekendDays: 2
          }
        }
        let res = await exec()
        expect(res.body).to.eql(expectedOutput)
      })

    })
  })

})