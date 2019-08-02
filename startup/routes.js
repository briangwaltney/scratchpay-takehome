const express = require('express');
const businessDates = require('../routes/businessDates');


module.exports = (app) => {
  app.use(express.json())
  //used for pubsub demo
  app.use(express.static('public'))
  //primary api address
  app.use('/api/v1/businessDates', businessDates);
}
