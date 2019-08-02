//PUBSUB CLIENT SCRIPT

//Make connection
const socket = io.connect('http://localhost:3001')

//setup variables
const date = document.getElementById('date')
const delay = document.getElementById('delay')
const btn = document.getElementById('send')
const query = document.getElementById('query')
const result = document.getElementById('result')
const error = document.getElementById('error')


//Submission event
btn.addEventListener('click', () => {
  //reset result
  result.innerHTML = ''

  //error handling on the frontend.
  if (!date.value || !delay.value) {
    error.innerHTML = 'Please enter a date and delay'
  } else {
    //send data to publisher for response.
    socket.emit('businessDates', {
      initialDate: date.value,
      delay: delay.value
    })
    //reset query if it is sent
    query.innerHTML = ''
  }
})

//displays error if it is returned.
socket.on('error', data => {
  error.innerHTML = `${data}`
})

//displays results from publisher
socket.on('businessDates', (data) => {
  error.innerHTML = ''
  result.innerHTML = `
  <h4>Results:</h4>
  <p>Date: ${data.results.businessDate}</p>
  <p>Total Days: ${data.results.totalDays}</p>
  <p>Holiday Days: ${data.results.holidayDays}</p>
  <p>Weekend Days: ${data.results.weekendDays}</p>
  `;
  query.innerHTML = `
  <h4>Query:</h4>
  <p>Initial Date: ${data.initialQuery.initialDate}</p>
  <p>Delay: ${data.initialQuery.delay}</p>
  `
})
