const request = require('supertest');

jest.mock('../models/socialModel');
const socialModel = require('../models/socialModel');
const app = require('../app');

describe('GET /api/socials', () => {
  it('retounen lis rezo sosyal yo', async () => {
    socialModel.findAll.mockResolvedValue([{ id: 1, platform: 'GitHub', url: 'https://github.com/Steven0p' }]);
    const res = await request(app).get('/api/socials');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});
