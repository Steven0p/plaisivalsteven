const pool = require('../config/db');

async function findByUsername(username) {
  const [rows] = await pool.query(
    'SELECT id, username, email, password FROM users WHERE username = ? LIMIT 1',
    [username]
  );
  return rows[0] || null;
}

async function findByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, username, email, password FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

async function create({ username, email, hashedPassword }) {
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return { id: result.insertId, username, email };
}

async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, username, email, password FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

async function updateAccount(id, { username, email, hashedPassword }) {
  const fields = [];
  const values = [];

  if (username !== undefined) {
    fields.push('username = ?');
    values.push(username);
  }
  if (email !== undefined) {
    fields.push('email = ?');
    values.push(email);
  }
  if (hashedPassword !== undefined) {
    fields.push('password = ?');
    values.push(hashedPassword);
  }
  if (fields.length === 0) return findById(id);

  values.push(id);
  await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
  return findById(id);
}

module.exports = { findByUsername, findByEmail, create, findById, updateAccount };
