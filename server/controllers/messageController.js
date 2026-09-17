const messageModel = require('../models/messageModel');

async function sendMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    const saved = await messageModel.create({ name, email, subject, message });
    return res.status(201).json(saved);
  } catch (err) {
    return next(err);
  }
}

async function listMessages(req, res, next) {
  try {
    const messages = await messageModel.findAll();
    return res.json(messages);
  } catch (err) {
    return next(err);
  }
}

async function updateMessageRead(req, res, next) {
  try {
    const isRead = req.body.is_read !== false;
    const updated = await messageModel.markRead(req.params.id, isRead);
    if (!updated) {
      return res.status(404).json({ message: 'Mesaj la pa jwenn.' });
    }
    return res.json({ id: Number(req.params.id), is_read: isRead });
  } catch (err) {
    return next(err);
  }
}

async function deleteMessage(req, res, next) {
  try {
    const deleted = await messageModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Mesaj la pa jwenn.' });
    }
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { sendMessage, listMessages, updateMessageRead, deleteMessage };
