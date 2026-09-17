const request = require('supertest');

jest.mock('../models/skillModel');
jest.mock('../models/experienceModel');
const skillModel = require('../models/skillModel');
const experienceModel = require('../models/experienceModel');
const app = require('../app');

describe('GET /api/skills', () => {
  it('retounen lis konpetans yo', async () => {
    skillModel.findAll.mockResolvedValue([{ id: 1, name: 'JavaScript' }]);
    const res = await request(app).get('/api/skills');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});

describe('GET /api/experiences', () => {
  it('retounen lis eksperyans yo', async () => {
    experienceModel.findAll.mockResolvedValue([{ id: 1, title: 'Devlopè' }]);
    const res = await request(app).get('/api/experiences');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});
