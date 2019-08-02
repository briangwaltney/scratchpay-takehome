//Validation middleware that can be reused for any 
//input when passed a validation function.

module.exports = (validator) => {
  return (req, res, next) => {
    const validation = validator(req.body);
    if (validation.error) return res.status(400).send(validation.error.details[0].message);
    next();
  }
}
