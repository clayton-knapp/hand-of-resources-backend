const { Router } = require('express');
const Subscriber = require('../models/Subscriber');

module.exports = Router()

  .post('/', async (req, res) => {
    const subscriber = await Subscriber.insert(req.body);

    res.send(subscriber);
  })

  .get('/', async (req, res) => {
    const subscribers = await Subscriber.getAll();

    res.send(subscribers);

  })


  .get('/:id', async (req, res) => {
    const subscriber = await Subscriber.getById(req.params.id);

    res.send(subscriber);


  })

  .delete('/:id', async (req, res) => {
    const subscriber = await Subscriber.deleteById(req.params.id);

    res.send(subscriber);

  });
