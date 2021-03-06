const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

require('./routes/create')(app);


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATH, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.get("/", (request, response) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
    response.sendStatus(200);
  });
  app.listen(process.env.PORT); // Recebe solicitações que o deixa online
  
  const Discord = require("discord.js"); //Conexão com a livraria Discord.js
  const client = new Discord.Client(); //Criação de um novo Client
  const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos
  
  client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token

module.exports = app;
