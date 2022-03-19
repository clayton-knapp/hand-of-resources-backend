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



  it('creates a pizza entry', async() => {
    const expected = {
      id: expect.any(String),
      pizzaName: 'Buffalo', 
      price: '$24.99', 
      toppings: ['white sauce', 'truffles', 'jack cheese']
    };

    const res = await request(app)
      .post('/api/v1/pizzas')
      .send({ 
        pizzaName: 'Buffalo', 
        price: '$24.99', 
        toppings: ['white sauce', 'truffles', 'jack cheese'] 
      });

    expect(res.body).toEqual(expected);

  });

});
