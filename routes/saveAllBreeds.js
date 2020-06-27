const express = require('express');
const Breeds = require('../models/breeds')
const router = express.Router();
const length = require('length')
const { default: Axios } = require('axios');

router.get('/', async (req, res, next) => {


  const user = await Axios.get("https://api.thecatapi.com/v1/breeds", {
    headers: {
      'x-api-key': '8676dee6-65f2-4574-afd5-58d94c7c01ce'
    }
  })

  // let CatFilter = [];

  var ifC = 0;
  var ElseC = 0;

  user.data.forEach(async (value, index) => {

    let catExist = await Breeds.findOne(user.data[index].id);
    if (catExist) {
      ifC++;
      console.log(1);
    }
    else {
      const breeds = await Breeds.create({
        id: value.id,
        temperament: value.temperament,
        origin: value.origin,
        description: value.description
      });
      ElseC++;
      console.log(ElseC);
    }
  });

  res.status(201).send({
    ifc: ifC,
    elssd: ElseC 
  });

  ifC = 0;
  ElseC = 0;

  // res.status(200).send({
  //   mensagem: 'Usando post'
  // });

});

module.exports = app => app.use('/save', router);