const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Done envalid.', errors: errors.array() });
  }
  return next();
}

module.exports = validate;
