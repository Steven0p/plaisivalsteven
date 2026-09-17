const express = require('express');
const { body } = require('express-validator');
const profileController = require('../controllers/profileController');
const requireAuth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/', profileController.getProfile);

router.put(
  '/',
  requireAuth,
  [
    body('full_name').optional().trim().notEmpty().withMessage('Non konplè pa ka vid.'),
    body('email').optional({ values: 'falsy' }).isEmail().withMessage('Imèl envalid.'),
    body('phone').optional({ values: 'falsy' }).trim(),
    body('cv_url').optional({ values: 'falsy' }).trim(),
  ],
  validate,
  profileController.updateProfile
);

module.exports = router;
