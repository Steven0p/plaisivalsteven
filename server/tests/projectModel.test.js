jest.mock('../config/db', () => ({
  query: jest.fn(),
}));

const pool = require('../config/db');
const projectModel = require('../models/projectModel');

describe('projectModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('findAll fè yon SELECT sou tab projects la', async () => {
    pool.query.mockResolvedValue([[{ id: 1, title: 'Sit' }]]);
    const result = await projectModel.findAll();
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM projects'));
    expect(result).toEqual([{ id: 1, title: 'Sit' }]);
  });

  it('create itilize yon prepared statement ak tout paramèt yo', async () => {
    pool.query
      .mockResolvedValueOnce([{ insertId: 10 }])
      .mockResolvedValueOnce([[{ id: 10, title: 'Nouvo' }]]);

    const result = await projectModel.create({ title: 'Nouvo' });

    expect(pool.query).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('INSERT INTO projects'),
      ['Nouvo', null, null, null, null, null]
    );
    expect(result).toEqual({ id: 10, title: 'Nouvo' });
  });

  it('update retounen null si pa gen okenn liy afekte', async () => {
    pool.query.mockResolvedValue([{ affectedRows: 0 }]);
    const result = await projectModel.update(999, { title: 'X' });
    expect(result).toBeNull();
  });

  it('remove retounen true si yon liy efase', async () => {
    pool.query.mockResolvedValue([{ affectedRows: 1 }]);
    const result = await projectModel.remove(1);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM projects WHERE id = ?', [1]);
    expect(result).toBe(true);
  });
});
