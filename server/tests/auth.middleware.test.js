const jwt = require('jsonwebtoken');
const requireAuth = require('../middlewares/auth');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('requireAuth middleware', () => {
  it('reponn 401 si pa gen header Authorization', () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('reponn 401 si token envalid', () => {
    const req = { headers: { authorization: 'Bearer faketoken' } };
    const res = mockRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('rele next() epi mete req.user si token valid', () => {
    const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = mockRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toMatchObject({ id: 1, username: 'admin' });
  });

  it('reponn 401 si scheme a pa "Bearer"', () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Basic ${token}` } };
    const res = mockRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
