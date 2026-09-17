const pool = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM socials ORDER BY platform ASC');
  return rows;
}

module.exports = { findAll };
