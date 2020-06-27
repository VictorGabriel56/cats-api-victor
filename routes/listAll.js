const express = require('express');
const Breeds = require('../models/breeds')
const router = express.Router();
const length = require('length');
const { render } = require('../app');

// listar tudo
router.get('/all', async (req, res, next) => {
    const all = await Breeds.find();;
    return res.send(all);
});

//listar somente raças
router.get('/all/breeds', async (req, res, next) => {
    const all = await Breeds.find({}, { "Breed": 1 });;
    return res.send(all);
});

//listar info de raças pelo nome da raça
router.get('/all/breed/:infoId', async (req, res, next) => {
    const all = await Breeds.find({Breed: req.params.infoId});
    return res.send(all);
});

//listar raças de acordo com o temperamento
router.get('/all/temp/:infoTemp', async (req, res, next) => {
    const all1 = await Breeds.find({"Temperament": {'$regex': req.params.infoTemp, '$options' : 'i'}});
    return res.send(all1);
});

//listar raças de acordo com a origem
router.get('/all/origin/:infoOrigin', async (req, res, next) => {
    const all1 = await Breeds.find({"Origin": {'$regex': req.params.infoOrigin, '$options' : 'i'}});
    return res.send(all1);
});

module.exports = app => app.use('/list', router);
