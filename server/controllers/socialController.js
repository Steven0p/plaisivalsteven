const socialModel = require('../models/socialModel');

async function listSocials(req, res, next) {
  try {
    const socials = await socialModel.findAll();
    return res.json(socials);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listSocials };
