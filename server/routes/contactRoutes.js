const express = require('express');
const { body } = require('express-validator');
const messageController = require('../controllers/messageController');
const validate = require('../middlewares/validate');
const { contactLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Non obligatwa.'),
    body('email').isEmail().withMessage('Imèl envalid.'),
    body('subject').optional({ values: 'falsy' }).trim(),
    body('message').trim().notEmpty().withMessage('Mesaj la pa ka vid.'),
  ],
  validate,
  messageController.sendMessage
);

module.exports = router;
