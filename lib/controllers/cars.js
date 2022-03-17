const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()

  .post('/', async (req, res) => {
    const car = await Car.insert(req.body);

    // console.log('car', car);

    res.send(car);
  });
