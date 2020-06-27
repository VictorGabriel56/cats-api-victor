const express = require('express');
const Breeds = require('../models/breeds')
const router = express.Router();
const length = require('length')
const { default: Axios } = require('axios');


router.get('/all', async (req, res, next) => {
  const all = await Breeds.find({},{"origin": 1});;
  return res.send({all});
});

router.get('/', async (req, res, next) => {


  const allBeardsSave = await Axios.get("https://api.thecatapi.com/v1/breeds", {
    headers: {
      'x-api-key': '8676dee6-65f2-4574-afd5-58d94c7c01ce'
    }
  })

  // let CatFilter = [];

  var ifC = 0;
  var ElseC = 0;

  allBeardsSave.data.forEach(async (value, index) => {

    let { id } = value.id;

    let catExist = await Breeds.findOne(id);

    if (!catExist) {
      console.log('foi');
      await Breeds.create({
        id: value.id,
        temperament: value.temperament,
        origin: value.origin,
        description: value.description
      });
    }
  });


  res.status(200).send({
    mensagem: 'Base Atualizada com informações!'
  });

});

module.exports = app => app.use('/save', router);