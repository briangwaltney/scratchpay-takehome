const express = require('express');
const router = express.Router();
const { validate } = require('../models/businessDates');
const validateBody = require('../middleware/validateBody');
const calculateDays = require('../utilities/calculateDays')


//API endpoint used for all calls including GET and POST as requested in the challenge.
router.all('/', validateBody(validate), async (req, res) => {
  //error handling is handled by validateBody middleware. 

  const results = calculateDays(req.body)

  return res.status(200).send({
    ok: true,
    initialQuery: req.body,
    results
  })

})


module.exports = router

