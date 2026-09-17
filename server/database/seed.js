require('dotenv').config();
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const userModel = require('../models/userModel');

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !email || !password) {
    console.error('ADMIN_USERNAME, ADMIN_EMAIL ak ADMIN_PASSWORD dwe defini nan .env');
    process.exitCode = 1;
    return;
  }

  const existing = await userModel.findByUsername(username);
  if (existing) {
    console.log(`Itilizatè admin "${username}" deja egziste. Anyen pa fèt.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({ username, email, hashedPassword });
  console.log(`Admin kreye: ${user.username} (${user.email})`);
}

seedAdmin()
  .catch((err) => {
    console.error('Erè pandan seed la:', err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
