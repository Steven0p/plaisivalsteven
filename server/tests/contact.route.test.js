const jwt = require('jsonwebtoken');
const request = require('supertest');

jest.mock('../models/messageModel');
const messageModel = require('../models/messageModel');
const app = require('../app');

describe('POST /api/contact', () => {
  it('refize done envalid (400)', async () => {
    const res = await request(app).post('/api/contact').send({ name: 'Jan' });
    expect(res.status).toBe(400);
  });

  it('anrejistre yon mesaj valid (201)', async () => {
    const saved = { id: 1, name: 'Jan', email: 'jan@example.com', message: 'Bonjou' };
    messageModel.create.mockResolvedValue(saved);

    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Jan', email: 'jan@example.com', message: 'Bonjou' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(saved);
  });
});

describe('GET /api/messages', () => {
  it('refize aksè san token (401)', async () => {
    const res = await request(app).get('/api/messages');
    expect(res.status).toBe(401);
  });

  it('retounen lis mesaj yo ak yon token valid', async () => {
    messageModel.findAll.mockResolvedValue([{ id: 1, name: 'Jan' }]);
    const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);

    const res = await request(app)
      .get('/api/messages')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});

describe('PATCH /api/messages/:id', () => {
  const token = () => jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);

  it('refize aksè san token (401)', async () => {
    const res = await request(app).patch('/api/messages/1').send({ is_read: true });
    expect(res.status).toBe(401);
  });

  it('make yon mesaj kòm li (200)', async () => {
    messageModel.markRead.mockResolvedValue(true);
    const res = await request(app)
      .patch('/api/messages/1')
      .set('Authorization', `Bearer ${token()}`)
      .send({ is_read: true });

    expect(res.status).toBe(200);
    expect(messageModel.markRead).toHaveBeenCalledWith('1', true);
  });

  it('reponn 404 si mesaj la pa egziste', async () => {
    messageModel.markRead.mockResolvedValue(false);
    const res = await request(app)
      .patch('/api/messages/999')
      .set('Authorization', `Bearer ${token()}`)
      .send({ is_read: true });

    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/messages/:id', () => {
  const token = () => jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);

  it('refize aksè san token (401)', async () => {
    const res = await request(app).delete('/api/messages/1');
    expect(res.status).toBe(401);
  });

  it('efase yon mesaj (204)', async () => {
    messageModel.remove.mockResolvedValue(true);
    const res = await request(app)
      .delete('/api/messages/1')
      .set('Authorization', `Bearer ${token()}`);

    expect(res.status).toBe(204);
  });
});
