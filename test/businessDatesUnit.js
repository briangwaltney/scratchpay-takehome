const calculateDays = require('../utilities/calculateDays')
const expect = require('chai').expect;


describe.skip('calculateDays unit test', () => {

  let initialQuery = {
    initialDate: '2018-12-25T10:10:10Z',
    delay: 20
  }

  let expectedResult = {
    businessDate: "2019-01-24T10:10:10.000Z",
    totalDays: 31,
    holidayDays: 3,
    weekendDays: 8
  }

  it('should return expected result', () => {
    const result = calculateDays(initialQuery)
    expect(result).to.eql(expectedResult)
  })

  it('should return "Missing inputs" if query is not correct', () => {
    initialQuery = {}
    const result = calculateDays(initialQuery)

    expect(result).to.equal('Missing inputs')
  })


})