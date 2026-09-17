const express = require('express');
const { body, param } = require('express-validator');
const projectController = require('../controllers/projectController');
const requireAuth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

const projectValidationRules = [
  body('title').trim().notEmpty().withMessage('Tit pwojè a obligatwa.'),
  body('description').optional({ values: 'falsy' }).trim(),
  body('image').optional({ values: 'falsy' }).trim(),
  body('technologies').optional({ values: 'falsy' }).trim(),
  body('github_url').optional({ values: 'falsy' }).isURL().withMessage('Lyen GitHub envalid.'),
  body('demo_url').optional({ values: 'falsy' }).isURL().withMessage('Lyen demo envalid.'),
];

router.get('/', projectController.listProjects);

router.post('/', requireAuth, projectValidationRules, validate, projectController.createProject);

router.put(
  '/:id',
  requireAuth,
  [param('id').isInt().withMessage('ID pwojè envalid.'), ...projectValidationRules],
  validate,
  projectController.updateProject
);

router.delete(
  '/:id',
  requireAuth,
  [param('id').isInt().withMessage('ID pwojè envalid.')],
  validate,
  projectController.deleteProject
);

module.exports = router;
