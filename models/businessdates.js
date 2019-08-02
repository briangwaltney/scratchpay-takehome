const Joi = require('joi');
require('joi-objectid');

//Validation function used to validate API endpoint inputs.

function validateBusinessDate(query) {
  const schema = {
    initialDate: Joi.date().required(),
    delay: Joi.number().required(),
  };
  return Joi.validate(query, schema);
}

exports.validate = validateBusinessDate;