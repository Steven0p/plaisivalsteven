function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Ou dwe voye yon fichye imaj.' });
  }
  return res.status(201).json({ url: `/uploads/${req.file.filename}` });
}

module.exports = { uploadFile };
