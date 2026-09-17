const pool = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM experiences ORDER BY start_date DESC');
  return rows;
}

module.exports = { findAll };
