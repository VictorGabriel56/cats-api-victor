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
  });

  let allBeardsSavePictures = await Axios.get("https://api.thecatapi.com/v1/images/search", {
    headers: {
      'x-api-key': '8676dee6-65f2-4574-afd5-58d94c7c01ce'
    }
  });

  allBeardsSave.data.forEach(async (value, index) => {

    let { id } = value.id;

    let catExist = await Breeds.findOne(id);

    if (!catExist) {
      await Breeds.create({
        Breed: value.id,
        Temperament: value.temperament,
        Origin: value.origin,
        Description: value.description
      });

    }

    var allBeardsSavePictures = await Axios.get("https://api.thecatapi.com/v1/images/search", {
        headers: {
          'x-api-key': '8676dee6-65f2-4574-afd5-58d94c7c01ce'
        },
        params: {
          breed_id: value.id,
          limit: 3
        }
      });

      try {
        if (allBeardsSavePictures.data[0] != null) {
          await Breeds.updateOne({ Breed: value.id },{Picture1: allBeardsSavePictures.data[0].url});
        }
      } catch (e) {
        console.log(e);
      }

      try {
        if (allBeardsSavePictures.data[1] != null) {
          await Breeds.updateOne({ Breed: value.id },{Picture2: allBeardsSavePictures.data[1].url});
        }
      } catch (e) {
        console.log(e);
      }

      try {
        if (allBeardsSavePictures.data[2] != null) {
          await Breeds.updateOne({ Breed: value.id },{Picture3: allBeardsSavePictures.data[2].url});
        }
      } catch (e) {
        console.log(e);
      }
  });


  res.status(200).send({
    mensagem: 'Atualização de base realizada com sucesso!'
  });

});

module.exports = app => app.use('/save', router);