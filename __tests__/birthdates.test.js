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
      birthDate: '11/27/1987'
    };

    const res = await request(app)
      .post('/api/v1/birthdates')
      .send({ 
        personName: 'Alex',
        birthDate: '11/27/1987' 
      });

    expect(res.body).toEqual(expected);
  });


  it('gets a list of all birthday entries', async() => {
    const expected = [
      {
        id: expect.any(String),
        personName: 'Clayton',
        birthDate: '4/20/1969'
      },
      {
        id: expect.any(String),
        personName: 'Bob',
        birthDate: '1/1/2000'
      }
    ];

    const res = await request(app)
      .get('/api/v1/birthdates');

    expect(res.body).toEqual(expected);

  });

  it('gets birthdate entry by id', async() => {
    const expected = {
      id: expect.any(String),
      personName: 'Bob',
      birthDate: '1/1/2000'
    };

    const res = await request(app)
      .get('/api/v1/birthdates/2');

    expect(res.body).toEqual(expected);

  });

  it('deletes birthdate entry by id', async() => {
    const expected =
      {
        id: expect.any(String),
        personName: 'Clayton',
        birthDate: '4/20/1969'
      };

    const res = await request(app)
      .delete('/api/v1/birthdates/1');

    expect(res.body).toEqual(expected);
    

  });

  it('updates a birthdate entry by id', async() => {
    const expected = 
      {
        id: expect.any(String),
        personName: 'Clayton',
        birthDate: '10/31/1969'
      };

    const res = await request(app)
      .patch('/api/v1/birthdates/1')
      .send({ birthDate: '10/31/1969' });

    expect(res.body).toEqual(expected);

  });

});

