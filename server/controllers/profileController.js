const profileModel = require('../models/profileModel');

async function getProfile(req, res, next) {
  try {
    const profile = await profileModel.getProfile();
    if (!profile) {
      return res.status(404).json({ message: 'Pwofil la poko konfigire.' });
    }
    return res.json(profile);
  } catch (err) {
    return next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const data = {};
    profileModel.FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
    });

    const updated = await profileModel.upsertProfile(data);
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
}

module.exports = { getProfile, updateProfile };
