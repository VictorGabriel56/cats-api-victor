const express = require('express');
const Breeds = require('../models/breeds')
const router = express.Router();
const length = require('length')
const { default: Axios } = require('axios');

router.get('/', async (req, res, next) => {


  const allBeardsSave = await Axios.get("https://api.thecatapi.com/v1/breeds", {
    headers: {
      'x-api-key': '8676dee6-65f2-4574-afd5-58d94c7c01ce'
    }
  })

  allBeardsSave.data.forEach(async (value, index) => {

    let { id } = value.id;

    let catExist = await Breeds.findOne(id);

    if (!catExist) {
      console.log('yep');
      await Breeds.create({
        Breed: value.id,
        Temperament: value.temperament,
        Origin: value.origin,
        Description: value.description
      });
    }
  });


  res.status(200).send({
    mensagem: 'Base Atualizada com informações!'
  });

});

module.exports = app => app.use('/save', router);