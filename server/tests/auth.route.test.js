const bcrypt = require('bcrypt');
const request = require('supertest');

jest.mock('../models/userModel');
const userModel = require('../models/userModel');
const app = require('../app');

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('reponn 400 si username oswa password manke', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).toBe(400);
  });

  it('reponn 401 si itilizatè a pa egziste', async () => {
    userModel.findByUsername.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'ghost', password: 'whatever' });

    expect(res.status).toBe(401);
  });

  it('reponn 401 si modpas la mal', async () => {
    const hashed = await bcrypt.hash('correct-password', 10);
    userModel.findByUsername.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: hashed,
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'wrong-password' });

    expect(res.status).toBe(401);
  });

  it('reponn 200 ak yon token si idantifyan yo bon', async () => {
    const hashed = await bcrypt.hash('correct-password', 10);
    userModel.findByUsername.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: hashed,
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'correct-password' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toMatchObject({ username: 'admin' });
  });
});
