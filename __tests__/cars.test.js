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

});


// it('gets the list of guitars', async() => {
//   const expected = await Guitar.getAll();

//   const res = await request(app)
//     .get('/api/v1/guitars');

//   expect(res.body).toEqual(expected);

//   // expect(res.body).toEqual([
//   //   { 
//   //     id: '1',
//   //     make: 'Fender',
//   //     model: 'Jazzmaster',
//   //     year: 1969,
//   //   },
//   //   { 
//   //     id: '2',
//   //     make: 'Gibson',
//   //     model: 'Les Paul Special',
//   //     year: 1958,
//   //   }
//   // ]);

// });

// it('gets one guitar', async() => {
//   const expected = await Guitar.getById(2);

//   // console.log(expected.id);

//   const res = await request(app)
//     .get(`/api/v1/guitars/${expected.id}`);

//   expect(res.body).toEqual(expected);

//   // expect(res.body).toEqual(
//   //   { 
//   //     id: '2',
//   //     make: 'Gibson',
//   //     model: 'Les Paul Special',
//   //     year: 1958,
//   //   }
//   // );

// });

// it('deletes a guitar', async() => {
//   const expected = await Guitar.getById(2);

//   const res = await request(app)
//     .delete(`/api/v1/guitars/${expected.id}`);

//   expect(res.body).toEqual(expected);

//   // expect(res.body).toEqual(
//   //   { 
//   //     id: '2',
//   //     make: 'Gibson',
//   //     model: 'Les Paul Special',
//   //     year: 1958,
//   //   }
//   // );

// });

// it('it gets a 404 if id does not exist for delete', async() => {
//   const res = await request(app)
//     .delete('/api/v1/guitars/999');

//   expect(res.status).toEqual(404);

// });

// it('it updates a guitar entry', async() => {
//   const expected = {
//     id: expect.any(String),
//     make: 'Fender',
//     model: 'Stratocaster',
//     year: 1982,
//   };

//   const res = await request(app)
//     .patch('/api/v1/guitars/1')
//     .send(
//       { 
//         model: 'Stratocaster',
//         year: 1982
//       });

//   expect(res.body).toEqual(expected);

// });
