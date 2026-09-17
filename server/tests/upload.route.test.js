const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../app');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

function authHeader() {
  const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);
  return `Bearer ${token}`;
}

describe('POST /api/upload', () => {
  const createdFiles = [];

  afterAll(() => {
    createdFiles.forEach((filePath) => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
  });

  it('refize aksè san token (401)', async () => {
    const res = await request(app).post('/api/upload');
    expect(res.status).toBe(401);
  });

  it('refize si pa gen okenn fichye (400)', async () => {
    const res = await request(app).post('/api/upload').set('Authorization', authHeader());
    expect(res.status).toBe(400);
  });

  it('refize yon fòma fichye ki pa yon imaj', async () => {
    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', authHeader())
      .attach('photo', Buffer.from('sa se yon tès'), {
        filename: 'test.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(400);
  });

  it('aksepte yon imaj valid epi retounen yon URL', async () => {
    const fakePng = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', authHeader())
      .attach('photo', fakePng, { filename: 'photo.png', contentType: 'image/png' });

    expect(res.status).toBe(201);
    expect(res.body.url).toMatch(/^\/uploads\//);

    const savedFilename = res.body.url.replace('/uploads/', '');
    createdFiles.push(path.join(UPLOAD_DIR, savedFilename));
  });
});
