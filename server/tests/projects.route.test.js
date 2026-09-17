const jwt = require('jsonwebtoken');
const request = require('supertest');

jest.mock('../models/projectModel');
const projectModel = require('../models/projectModel');
const app = require('../app');

function authHeader() {
  const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);
  return `Bearer ${token}`;
}

describe('GET /api/projects', () => {
  it('retounen lis pwojè yo san otantifikasyon', async () => {
    projectModel.findAll.mockResolvedValue([{ id: 1, title: 'Sit Pòtfolyo' }]);

    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});

describe('POST /api/projects', () => {
  it('refize aksè san token (401)', async () => {
    const res = await request(app).post('/api/projects').send({ title: 'Nouvo pwojè' });
    expect(res.status).toBe(401);
  });

  it('refize done envalid (400) menm ak otantifikasyon', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', authHeader())
      .send({});

    expect(res.status).toBe(400);
  });

  it('kreye yon pwojè ak done valid', async () => {
    const created = { id: 5, title: 'Nouvo pwojè', description: null };
    projectModel.create.mockResolvedValue(created);

    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', authHeader())
      .send({ title: 'Nouvo pwojè' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });
});

describe('PUT /api/projects/:id', () => {
  it('reponn 404 si pwojè a pa egziste', async () => {
    projectModel.update.mockResolvedValue(null);

    const res = await request(app)
      .put('/api/projects/999')
      .set('Authorization', authHeader())
      .send({ title: 'Modifye' });

    expect(res.status).toBe(404);
  });

  it('reponn 400 si id la pa yon nonb', async () => {
    const res = await request(app)
      .put('/api/projects/abc')
      .set('Authorization', authHeader())
      .send({ title: 'Modifye' });

    expect(res.status).toBe(400);
  });

  it('aksepte demo_url/github_url null san rejte modifikasyon an (regression)', async () => {
    const updated = { id: 1, title: 'E-UNI', demo_url: null, github_url: null };
    projectModel.update.mockResolvedValue(updated);

    const res = await request(app)
      .put('/api/projects/1')
      .set('Authorization', authHeader())
      .send({
        title: 'E-UNI',
        description: null,
        image: null,
        technologies: null,
        github_url: null,
        demo_url: null,
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
  });
});

describe('DELETE /api/projects/:id', () => {
  it('efase yon pwojè ki egziste (204)', async () => {
    projectModel.remove.mockResolvedValue(true);

    const res = await request(app)
      .delete('/api/projects/1')
      .set('Authorization', authHeader());

    expect(res.status).toBe(204);
  });

  it('reponn 404 si pwojè a pa egziste', async () => {
    projectModel.remove.mockResolvedValue(false);

    const res = await request(app)
      .delete('/api/projects/999')
      .set('Authorization', authHeader());

    expect(res.status).toBe(404);
  });
});
