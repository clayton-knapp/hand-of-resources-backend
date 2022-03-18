const { Router } = require('express');
const Birthdate = require('../models/Birthdate');

module.exports = Router()

  .post('/', async (req, res) => {
    const birthDateEntry = await Birthdate.insert(req.body);

    res.send(birthDateEntry);

  });
