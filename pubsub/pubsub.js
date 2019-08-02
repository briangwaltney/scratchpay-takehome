const socket = require('socket.io')
const calculateDays = require('../utilities/calculateDays')

//Publisher socket setup.
module.exports = (server) => {
  const io = socket(server)

  io.on('connection', (socket) => {
    console.log('made socket connection');

    //when businessDates data is sent, calculates the results
    //and returns an object with the initial query, ok, and the results.

    socket.on('businessDates', (data) => {
      //calculates results
      let results = calculateDays(data)

      //error check based on results output
      if (results === 'Missing inputs') {
        io.sockets.emit('error', results)
      } else {
        //final result published.
        io.sockets.emit('businessDates', { ok: true, initialQuery: data, results })
      }
    })
  })
}