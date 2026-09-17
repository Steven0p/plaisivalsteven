const pool = require('../config/db');

const FIELDS = [
  'full_name',
  'title',
  'bio',
  'photo',
  'email',
  'phone',
  'location',
  'cv_url',
];

async function getProfile() {
  const [rows] = await pool.query('SELECT * FROM profile ORDER BY id ASC LIMIT 1');
  return rows[0] || null;
}

async function upsertProfile(data) {
  const existing = await getProfile();
  const values = FIELDS.map((field) => (data[field] !== undefined ? data[field] : null));

  if (!existing) {
    const placeholders = FIELDS.map(() => '?').join(', ');
    const [result] = await pool.query(
      `INSERT INTO profile (${FIELDS.join(', ')}) VALUES (${placeholders})`,
      values
    );
    return { id: result.insertId, ...data };
  }

  const setClause = FIELDS.map((field) => `${field} = ?`).join(', ');
  await pool.query(`UPDATE profile SET ${setClause} WHERE id = ?`, [...values, existing.id]);
  return { id: existing.id, ...data };
}

module.exports = { getProfile, upsertProfile, FIELDS };
