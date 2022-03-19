const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Car = require('../lib/models/Car');

describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a car entry', async() => {
    const res = await request(app)
      .post('/api/v1/cars')
      .send({ 
        make: 'Dodge', 
        model: 'Van', 
        year: 2003 
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      make: 'Dodge',
      model: 'Van', 
      year: 2003,
    });

  });

  it('gets a list of all cars', async() => {
    const expected = [
      { id: expect.any(String), make: 'Ford', model: 'F-150', year: 2006 },
      { id: expect.any(String), make: 'Nissan', model: 'D21', year: 1997 },
      { id: expect.any(String), make: 'Subaru', model: 'Legacy', year: 1990 }
    ];

    const res = await request(app)
      .get('/api/v1/cars');

    expect(res.body).toEqual(expected);

  });

  it('gets a car by id', async() => {
    const expected = { id: expect.any(String), make: 'Nissan', model: 'D21', year: 1997 };

    const res = await request(app)
      .get('/api/v1/cars/2');

    expect(res.body).toEqual(expected);


  });

  it('deletes a car by id', async() => {
    const expected = { id: expect.any(String), make: 'Subaru', model: 'Legacy', year: 1990 };

    const res = await request(app)
      .delete('/api/v1/cars/3');

    expect(res.body).toEqual(expected);

  });

  it('updates a car by id', async() => {
    const expected = { id: expect.any(String), make: 'Subaru', model: 'Outback', year: 2005 };

    const res = await request(app)
      .patch('/api/v1/cars/3')
      .send({ model: 'Outback', year: 2005 });

    expect(res.body).toEqual(expected);

  });

});
