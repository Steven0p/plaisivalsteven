const experienceModel = require('../models/experienceModel');

async function listExperiences(req, res, next) {
  try {
    const experiences = await experienceModel.findAll();
    return res.json(experiences);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listExperiences };
