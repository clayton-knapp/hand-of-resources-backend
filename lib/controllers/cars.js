const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()

  .post('/', async (req, res) => {
    const car = await Car.insert(req.body);

    // console.log('car', car);

    res.send(car);
  })


  .get('/', async (req, res) => {
    const cars = await Car.getAll();

    res.send(cars);
  })

  
  .get('/:id', async (req, res) => {
    const car = await Car.getById(req.params.id);

    res.send(car);

  });
