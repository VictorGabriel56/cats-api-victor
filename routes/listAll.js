const express = require('express');
const Breeds = require('../models/breeds')
const Category = require('../models/categoryPics')
const router = express.Router();
const length = require('length');
const { render } = require('../app');
const pino = require('pino');
const log = pino(pino.destination('./logs/logs.log'));
const logger = pino();
const expressPino = require('express-pino-logger');  //modified
const expressLogger = expressPino({ logger: log });  //added
router.use(expressLogger) //modified

// listar tudo
router.get('/all', async (req, res, next) => {
    const all = await Breeds.find();;
    if (all.length != 0) {
    logger.info('Listando todas as inforações disponiveis na base!');
    return res.send(all);
    }
    else {
        logger.warn('Não existe inforações disponiveis na base.')
        res.status(404).send({
            mensagem: 'message: Não existe inforações disponiveis na base.'
        });

    }
});

//listar somente raças
router.get('/all/breeds', async (req, res, next) => {

    const all = await Breeds.find({}, { "Breed": 1 });;

    if (all.length != 0) {
        logger.info('Listando todas as raças disponiveis na base.');
        return res.send(all);
    }
    else {
        logger.warn('Não existe racas disponiveis na base.')
        res.status(404).send({
            mensagem: 'message: Não existe racas disponiveis na base.'
        });

    }
});

//listar info de raças pelo nome da raça
router.get('/breed/:infoId', async (req, res, next) => {
    var all = await Breeds.findOne({ Breed: req.params.infoId });

    if (all != null) {
        logger.info('Raca encontrada!')
        return res.send(all);
    } else {
        logger.warn("Raca nao encontrada ao listar.")
        res.status(404).send({
            mensagem: 'message: Essa raca não foi encontrada.'
        });
    }
});

//listar raças de acordo com o temperamento
router.get('/temp/:infoTemp', async (req, res, next) => {
    var all = await Breeds.find({ "Temperament": { '$regex': req.params.infoTemp, '$options': 'i' } });


    if (all.length != 0) {
        logger.info('Raca(s) encontrada(s) de acordo com o temperamento informado.')
        return res.send(all);
    } else {
        logger.warn("Raca nao encontrada ao listar utilizando temperamento informado.")
        res.status(404).send({
            mensagem: 'message: Raca nao encontrada ao listar utilizando temperamento informado'
        });
    }
});

//listar raças de acordo com a origem
router.get('/origin/:infoOrigin', async (req, res, next) => {
    const all = await Breeds.find({ "Origin": { '$regex': req.params.infoOrigin, '$options': 'i' } });

    if (all.length != 0) {
        logger.info('Raca(s) encontrada(s) de acordo com o temperamento informado.')
        return res.send(all);
    } else {
        logger.warn("Raca(s) nao encontrada(s) ao listar utilizando temperamento passado.")
        res.status(404).send({
            mensagem: 'message: Raca nao encontrada ao listar de acordo com a origem informada'
        });
    }
});
//listar gatos de chapéu
router.get('/all/hat', async (req, res, next) => {
    const all = await Category.find({ Category: 'Hat' });;
    if (all.length != 0) {
        logger.info("Fotos de gato de chapeu listadas.");
        return res.send(all);
    }
    else {
        logger.warn("Não existe fotos de gatos com oculos na base.")
        res.status(404).send({
            mensagem: 'message: Não existe fotos de gatos com oculos na base.'
        });
    }

});

//listar gatos de oculos
router.get('/all/sunglass', async (req, res, next) => {
    const all = await Category.find({ Category: 'Sunglasses' });
    if (all.length != 0) {
        logger.info("Fotos de gato de oculos listadas.");
        return res.send(all);
    }
    else {
        logger.warn("Não existe fotos de gatos com oculos na base.")
        res.status(404).send({
            mensagem: 'message: Não existe fotos de gatos com oculos na base.'
        });
    }
});

module.exports = app => app.use('/list', router);
