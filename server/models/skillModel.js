const pool = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM skills ORDER BY category ASC, name ASC');
  return rows;
}

module.exports = { findAll };
