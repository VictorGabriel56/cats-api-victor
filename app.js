const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pino = require('pino');
const log = pino(pino.destination('./logs/logs.log'), { level: process.env.LOG_LEVEL || 'info' });
const expressPino = require('express-pino-logger');
const expressLogger = expressPino({ logger: log });
const logger = pino({ prettyPrint: { suppressFlushSyncWarning: true } });

require('./routes/saveAllBreeds')(app);
require('./routes/listAll')(app);
require('./routes/saveCategoryPictures')(app);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATH, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(expressLogger)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/free', freeC);

app.use((req, res, next) => {
    const erro = new Error('URL not found');
    erro.status = 404;
    next(erro);
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    if(error.status=404){
        logger.warn(error.message);
    }
    else if(error.status=500){
        logger.error(error.message);
    }
    

    return res.send({
        Trace: error.message
    });
});

module.exports = app;