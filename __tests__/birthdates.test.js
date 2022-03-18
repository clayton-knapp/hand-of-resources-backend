const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });



  it('creates a birthdate entry', async() => {
    const expected = {
      id: expect.any(String),
      personName: 'Alex',
      birthdate: '1987-11-27'
    };

    const res = await request(app)
      .post('/api/v1/birthdates')
      .send({ 
        personName: 'Alex',
        birthdate: '1987-11-27' 
      });

    expect(res.body).toEqual(expected);
  });

});

// ('Clayton', '1969-04-20'),
// ('Bob', '2000-01-01');