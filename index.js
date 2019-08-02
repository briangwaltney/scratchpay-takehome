//Dependencies and Setup
const express = require('express');
const app = express();


//sets up route handling
require('./startup/routes')(app);

//3001 selected because it will be used as proxy in React app
const port = 3001;

//Sets up initial listening
const server = app.listen(port, () => {
  console.log(`listening on port ${port}...`)
});

//connect to sockets
require('./pubsub/pubsub')(server)

module.exports = server;