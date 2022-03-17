const { Router } = require('express');
const Subscriber = require('../models/Subscriber');

module.exports = Router()

  .post('/', async (req, res) => {
    const subscriber = await Subscriber.insert(req.body);

    res.send(subscriber);
  });

