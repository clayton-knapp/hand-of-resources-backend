const { Router } = require('express');
const Birthdate = require('../models/Birthdate');

module.exports = Router()

  .post('/', async (req, res) => {
    const birthDateEntry = await Birthdate.insert(req.body);

    res.send(birthDateEntry);

  })

  .get('/', async (req, res) => {
    const birthDateEntries = await Birthdate.getAll();

    res.send(birthDateEntries);

  })

  .get('/:id', async (req, res) => {
    const birthDateEntry = await Birthdate.getById(req.params.id);

    res.send(birthDateEntry);

  })

  .delete('/:id', async (req, res) => {
    const birthDateEntry = await Birthdate.deleteById(req.params.id);

    res.send(birthDateEntry);

  });
