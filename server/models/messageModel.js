const pool = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
  return rows;
}

async function create({ name, email, subject, message }) {
  const [result] = await pool.query(
    'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject || null, message]
  );
  return { id: result.insertId, name, email, subject, message, is_read: false };
}

async function markRead(id, isRead) {
  const [result] = await pool.query('UPDATE messages SET is_read = ? WHERE id = ?', [isRead, id]);
  return result.affectedRows > 0;
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM messages WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, create, markRead, remove };
