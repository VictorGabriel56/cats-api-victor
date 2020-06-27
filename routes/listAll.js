const express = require('express');
const Breeds = require('../models/breeds')
const router = express.Router();
const length = require('length');
const { render } = require('../app');
const logger = require('../config/logger');

// listar tudo
router.get('/all', async (req, res, next) => {
    const all = await Breeds.find();;
    return res.send(all);
});

//listar somente raças
router.get('/all/breeds', async (req, res) => {


    const all = await Breeds.find({}, { "Breed": 1 });;

    logger.log('info',"listando apenas raças");
    return res.send(all);
});

//listar info de raças pelo nome da raça
router.get('/breed/:infoId', async (req, res) => {

    var all = await Breeds.findOne({ Breed: req.params.infoId });

    let { Breed } = all;

    if (Breed != 'undefined') {
        console.log("Raça encontrada!")
        console.log('info', `Raça encontrada!`)
        return res.send(all);
    } else {
        res.status(404).send({
            mensagem: 'Essa raça não foi encontrada!'
        });
    }

    // return res.send(all);
});

//listar raças de acordo com o temperamento
router.get('/temp/:infoTemp', async (req, res) => {
    var all = await Breeds.find({ "Temperament": { '$regex': req.params.infoTemp, '$options': 'i' } });
    if(all.length != 0){
        console.log("Raças encontradas de acordo com o temperamento!")
        return res.send(all);
    }else{
        console.log("Nenhuma raça foi encontrada de acordo com o temperamento passado!");
        res.status(404).send({
            mensagem: 'Nenhuma raça foi encontrada de acordo com o temperamento passado!'
        });
    }
    // return res.send(all);
});

//listar raças de acordo com a origem
router.get('/origin/:infoOrigin', async (req, res, next) => {
    var all = await Breeds.find({ "Origin": { '$regex': req.params.infoOrigin, '$options': 'i' } });
    return res.send(all);
});

module.exports = app => app.use('/list', router);
