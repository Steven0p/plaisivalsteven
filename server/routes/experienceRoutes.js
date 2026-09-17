const express = require('express');
const experienceController = require('../controllers/experienceController');

const router = express.Router();

router.get('/', experienceController.listExperiences);

module.exports = router;
