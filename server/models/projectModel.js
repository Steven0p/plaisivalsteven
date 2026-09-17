const pool = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function create({ title, description, image, technologies, github_url, demo_url }) {
  const [result] = await pool.query(
    `INSERT INTO projects (title, description, image, technologies, github_url, demo_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description || null, image || null, technologies || null, github_url || null, demo_url || null]
  );
  return findById(result.insertId);
}

async function update(id, { title, description, image, technologies, github_url, demo_url }) {
  const [result] = await pool.query(
    `UPDATE projects SET title = ?, description = ?, image = ?, technologies = ?, github_url = ?, demo_url = ?
     WHERE id = ?`,
    [title, description || null, image || null, technologies || null, github_url || null, demo_url || null, id]
  );
  if (result.affectedRows === 0) return null;
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
