const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('supertest');

jest.mock('../models/userModel');
const userModel = require('../models/userModel');
const app = require('../app');

function authHeader(id = 1, username = 'admin') {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET);
  return `Bearer ${token}`;
}

describe('PUT /api/auth/account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('refize aksè san token (401)', async () => {
    const res = await request(app)
      .put('/api/auth/account')
      .send({ current_password: 'x', new_email: 'a@b.com' });
    expect(res.status).toBe(401);
  });

  it('refize si modpas aktyèl la manke (400)', async () => {
    const res = await request(app)
      .put('/api/auth/account')
      .set('Authorization', authHeader())
      .send({ new_email: 'a@b.com' });
    expect(res.status).toBe(400);
  });

  it('refize si nouvo modpas la twò kout (400)', async () => {
    const res = await request(app)
      .put('/api/auth/account')
      .set('Authorization', authHeader())
      .send({ current_password: 'old-pass', new_password: 'short' });
    expect(res.status).toBe(400);
  });

  it('reponn 403 si modpas aktyèl la mal (pa 401, pou pa deklannche dekoneksyon otomatik)', async () => {
    const hashed = await bcrypt.hash('correct-password', 10);
    userModel.findById.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: hashed,
    });

    const res = await request(app)
      .put('/api/auth/account')
      .set('Authorization', authHeader())
      .send({ current_password: 'wrong-password', new_email: 'new@example.com' });

    expect(res.status).toBe(403);
  });

  it('reponn 409 si nouvo imèl la deja itilize pa yon lòt kont', async () => {
    const hashed = await bcrypt.hash('correct-password', 10);
    userModel.findById.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: hashed,
    });
    userModel.findByEmail.mockResolvedValue({ id: 2, email: 'taken@example.com' });

    const res = await request(app)
      .put('/api/auth/account')
      .set('Authorization', authHeader())
      .send({ current_password: 'correct-password', new_email: 'taken@example.com' });

    expect(res.status).toBe(409);
  });

  it('modifye imèl ak modpas ak done valid (200)', async () => {
    const hashed = await bcrypt.hash('correct-password', 10);
    userModel.findById.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: hashed,
    });
    userModel.findByEmail.mockResolvedValue(null);
    userModel.updateAccount.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'nouvo@example.com',
    });

    const res = await request(app)
      .put('/api/auth/account')
      .set('Authorization', authHeader())
      .send({
        current_password: 'correct-password',
        new_email: 'nouvo@example.com',
        new_password: 'nouvo-modpas-solid',
      });

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('nouvo@example.com');
    expect(userModel.updateAccount).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ email: 'nouvo@example.com' })
    );
  });
});
