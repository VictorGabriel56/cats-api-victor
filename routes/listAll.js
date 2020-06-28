const express = require('express');
const Breeds = require('../models/breeds')
const router = express.Router();
const length = require('length');
const { render } = require('../app');
const pino = require('pino');
// const logger = pino(pino.destination('./logs.log'))
const log = pino(pino.destination('./logs/logs.log'), { level: process.env.LOG_LEVEL || 'info' });
// const log = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressPino = require('express-pino-logger');  //modified
const expressLogger = expressPino({ logger:log });  //added
router.use(expressLogger) //modified


// listar tudo
router.get('/all', async (req, res, next) => {
    const all = await Breeds.find();;
    return res.send(all);
    res.status(400).send();
});

//listar somente raças
router.get('/all/breeds', async (req, res, next) => {
    const all = await Breeds.find({}, { "Breed": 1 });;
    return res.send(all);
});

//listar info de raças pelo nome da raça
router.get('/breed/:infoId', async (req, res, next) => {
    const all = await Breeds.find({Breed: req.params.infoId});
    return res.send(all);
});

//listar raças de acordo com o temperamento
router.get('/temp/:infoTemp', async (req, res, next) => {
    const all1 = await Breeds.find({"Temperament": {'$regex': req.params.infoTemp, '$options' : 'i'}});
    return res.send(all1);
});

//listar raças de acordo com a origem
router.get('/origin/:infoOrigin', async (req, res, next) => {
    const all1 = await Breeds.find({"Origin": {'$regex': req.params.infoOrigin, '$options' : 'i'}});
    return res.send(all1);
});

module.exports = app => app.use('/list', router);
