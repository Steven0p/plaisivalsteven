const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const requireAuth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { authLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post(
  '/login',
  authLimiter,
  [
    body('username').trim().notEmpty().withMessage('Non itilizatè obligatwa.'),
    body('password').notEmpty().withMessage('Modpas obligatwa.'),
  ],
  validate,
  authController.login
);

router.put(
  '/account',
  requireAuth,
  authLimiter,
  [
    body('current_password').notEmpty().withMessage('Modpas aktyèl la obligatwa.'),
    body('new_username').optional({ values: 'falsy' }).trim().isLength({ min: 3 }).withMessage('Non itilizatè a dwe gen omwen 3 karaktè.'),
    body('new_email').optional({ values: 'falsy' }).isEmail().withMessage('Imèl envalid.'),
    body('new_password').optional({ values: 'falsy' }).isLength({ min: 8 }).withMessage('Nouvo modpas la dwe gen omwen 8 karaktè.'),
  ],
  validate,
  authController.updateAccount
);

module.exports = router;
