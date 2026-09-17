const express = require('express');
const { param } = require('express-validator');
const messageController = require('../controllers/messageController');
const requireAuth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/', requireAuth, messageController.listMessages);

router.patch(
  '/:id',
  requireAuth,
  [param('id').isInt().withMessage('ID mesaj envalid.')],
  validate,
  messageController.updateMessageRead
);

router.delete(
  '/:id',
  requireAuth,
  [param('id').isInt().withMessage('ID mesaj envalid.')],
  validate,
  messageController.deleteMessage
);

module.exports = router;
