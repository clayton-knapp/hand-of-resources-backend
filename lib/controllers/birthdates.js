const { Router } = require('express');
const Birthdate = require('../models/Birthdate');

module.exports = Router()

  .post('/', async (req, res) => {
    const birthdate = await Birthdate.insert(req.body);

    res.send(birthdate);

  });
