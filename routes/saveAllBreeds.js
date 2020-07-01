const express = require('express');
require('dotenv').config()
const Breeds = require('../models/breeds')
const router = express.Router();
const { default: Axios } = require('axios');
const pino = require('pino');
const log = pino(pino.destination('./logs/logs.log'), { level: process.env.LOG_LEVEL || 'info' });
const expressPino = require('express-pino-logger');
const expressLogger = expressPino({ logger: log });
router.use(expressLogger)
const logger = pino({ prettyPrint: { suppressFlushSyncWarning: true } });

const key = process.env.ApiKey;

router.get('/', async (req, res, next) => {

  try {
    const allBeardsSave = await Axios.get("https://api.thecatapi.com/v1/breeds", {
      headers: {
        'x-api-key': key
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
          'x-api-key': key
        },
        params: {
          breed_id: value.id,
          limit: 3
        }
      });

      if (allBeardsSavePictures.data[0] != null) {
        await Breeds.updateOne({ Breed: value.id }, { Picture1: allBeardsSavePictures.data[0].url });
      }

      if (allBeardsSavePictures.data[1] != null) {
        await Breeds.updateOne({ Breed: value.id }, { Picture2: allBeardsSavePictures.data[1].url });
      }

      if (allBeardsSavePictures.data[2] != null) {
        await Breeds.updateOne({ Breed: value.id }, { Picture3: allBeardsSavePictures.data[2].url });
      }

    });
    logger.info("Api de atualizacao chamada com sucesso.")
      res.status(200).send({
        mensagem: 'Atualizacao de base realizada com sucesso!'
      });
  } catch (e) {
    logger.error(e);
    res.status(500).send({e});
  }

});

module.exports = app => app.use('/save', router);
