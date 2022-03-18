const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Subscriber = require('../lib/models/Subscriber');

describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });



  it('creates a subscriber entry', async() => {
    const res = await request(app)
      .post('/api/v1/subscribers')
      .send({ 
        email: 'jason@jason.com', 
        subscribed: true, 
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'jason@jason.com', 
      subscribed: true,
    });
  });

  it('gets list of subscribers', async() => {
    const expected = [
      { id: expect.any(String), email: 'clay@clay.com', subscribed: true },
      { id: expect.any(String), email: 'sterling@sterling.com', subscribed: false }
    ];

    const res = await request(app)
      .get('/api/v1/subscribers');

    expect(res.body).toEqual(expected);
    
  });

  

  it('gets subscriber by id', async() => {
    const expected = { 
      id: expect.any(String), 
      email: 'clay@clay.com', 
      subscribed: true 
    };

    const res = await request(app)
      .get('/api/v1/subscribers/1');

    expect(res.body).toEqual(expected);


  });

  
  it('deletes subscriber by id', async() => {
    const expected = { 
      id: expect.any(String), 
      email: 'sterling@sterling.com', subscribed: false 
    };

    const res = await request(app)
      .delete('/api/v1/subscribers/2');

    expect(res.body).toEqual(expected);
  });

});
