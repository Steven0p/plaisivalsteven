const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Twòp mesaj voye. Tanpri eseye ankò pita.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Twòp tantativ koneksyon. Tanpri eseye ankò pita.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { contactLimiter, authLimiter };
