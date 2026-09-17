const jwt = require('jsonwebtoken');
const request = require('supertest');

jest.mock('../models/profileModel');
const profileModel = require('../models/profileModel');
const app = require('../app');

profileModel.FIELDS = [
  'full_name',
  'title',
  'bio',
  'photo',
  'email',
  'phone',
  'location',
  'cv_url',
];

describe('GET /api/profile', () => {
  it('reponn 404 si pwofil la poko konfigire', async () => {
    profileModel.getProfile.mockResolvedValue(null);
    const res = await request(app).get('/api/profile');
    expect(res.status).toBe(404);
  });

  it('reponn 200 ak pwofil la si li egziste', async () => {
    profileModel.getProfile.mockResolvedValue({ id: 1, full_name: 'Steven' });
    const res = await request(app).get('/api/profile');
    expect(res.status).toBe(200);
    expect(res.body.full_name).toBe('Steven');
  });
});

describe('PUT /api/profile', () => {
  it('refize aksè san token (401)', async () => {
    const res = await request(app).put('/api/profile').send({ full_name: 'Steven' });
    expect(res.status).toBe(401);
  });

  it('modifye pwofil la ak yon token valid', async () => {
    profileModel.upsertProfile.mockResolvedValue({ id: 1, full_name: 'Steven Plaisival' });
    const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);

    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ full_name: 'Steven Plaisival' });

    expect(res.status).toBe(200);
    expect(res.body.full_name).toBe('Steven Plaisival');
  });

  it('reponn 400 si imèl la envalid', async () => {
    const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);

    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'pa-yon-imel' });

    expect(res.status).toBe(400);
  });

  it('aksepte email/phone/cv_url null san rejte modifikasyon an (regression)', async () => {
    const updated = { id: 1, full_name: 'Steven', email: null, phone: null, cv_url: null };
    profileModel.upsertProfile.mockResolvedValue(updated);
    const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);

    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ full_name: 'Steven', email: null, phone: null, cv_url: null });

    expect(res.status).toBe(200);
  });
});
