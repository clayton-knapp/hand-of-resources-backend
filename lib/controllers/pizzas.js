const { Router } = require('express');
const Pizza = require('../models/Pizza');

module.exports = Router()

  .post('/', async (req, res) => {
    const pizza = await Pizza.insert(req.body);

    res.send(pizza);

  });
