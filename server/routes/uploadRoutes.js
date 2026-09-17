const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const requireAuth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

function handleUpload(req, res, next) {
  upload.single('photo')(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    }
    return next();
  });
}

router.post('/', requireAuth, handleUpload, uploadController.uploadFile);

module.exports = router;
