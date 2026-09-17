const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Non itilizatè oswa modpas envalid.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Non itilizatè oswa modpas envalid.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    return next(err);
  }
}

async function updateAccount(req, res, next) {
  try {
    const { current_password, new_username, new_email, new_password } = req.body;

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Itilizatè a pa jwenn.' });
    }

    const match = await bcrypt.compare(current_password, user.password);
    if (!match) {
      return res.status(403).json({ message: 'Modpas aktyèl la pa kòrèk.' });
    }

    if (new_username && new_username !== user.username) {
      const existing = await userModel.findByUsername(new_username);
      if (existing && existing.id !== user.id) {
        return res.status(409).json({ message: 'Non itilizatè sa a deja pran.' });
      }
    }

    if (new_email && new_email !== user.email) {
      const existing = await userModel.findByEmail(new_email);
      if (existing && existing.id !== user.id) {
        return res.status(409).json({ message: 'Yon lòt kont deja itilize imèl sa a.' });
      }
    }

    const updates = {};
    if (new_username) updates.username = new_username;
    if (new_email) updates.email = new_email;
    if (new_password) updates.hashedPassword = await bcrypt.hash(new_password, 10);

    const updated = await userModel.updateAccount(user.id, updates);
    return res.json({ id: updated.id, username: updated.username, email: updated.email });
  } catch (err) {
    return next(err);
  }
}

module.exports = { login, updateAccount };
