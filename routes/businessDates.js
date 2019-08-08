const express = require("express");
const router = express.Router();
const Joi = require("joi");
//const { validate } = require("../models/businessDates");
const validateBody = require("../middleware/validateBody");
const calculateDays = require("../utilities/calculateDays");

//Validation function used to validate API endpoint inputs.
function validate(query) {
  const schema = {
    initialDate: Joi.date().required(),
    delay: Joi.number().required()
  };
  return Joi.validate(query, schema);
}

//API endpoint used for all calls including GET and POST as requested in the challenge.
router.all("/", validateBody(validate), async (req, res) => {
  //error handling is handled by validateBody middleware.

  const results = calculateDays(req.body);

  return res.status(200).send({
    ok: true,
    initialQuery: req.body,
    results
  });
});

module.exports = router;
