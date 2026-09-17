const skillModel = require('../models/skillModel');

async function listSkills(req, res, next) {
  try {
    const skills = await skillModel.findAll();
    return res.json(skills);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listSkills };
