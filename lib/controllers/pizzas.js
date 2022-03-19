const { Router } = require('express');
const Pizza = require('../models/Pizza');

module.exports = Router()

  .post('/', async (req, res) => {
    const pizza = await Pizza.insert(req.body);

    res.send(pizza);

  })

  .get('/', async (req, res) => {
    const pizzas = await Pizza.getAll();

    res.send(pizzas);

  })

  .get('/:id', async (req, res) => {
    const pizza = await Pizza.getById(req.params.id);

    res.send(pizza);

  })

  .delete('/:id', async (req, res) => {
    const pizza = await Pizza.deleteById(req.params.id);

    res.send(pizza);

  })

  .patch('/:id', async (req, res) => {
    const pizza = await Pizza.updateById(req.params.id, req.body);

    res.send(pizza);

  });
