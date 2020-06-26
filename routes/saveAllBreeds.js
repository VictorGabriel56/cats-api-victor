const express = require('express');
const router = express.Router();
// const https = require('https');
const { default: Axios } = require('axios');
// const { json } = require('body-parser');
// const { response } = require('../app');


router.get('/',async (req,res,next) => {

  const user = await Axios.get("https://api.github.com/users/VictorGabriel56");

  const{name, avatar_url} = user.data;
 
  console.log("name: "+user.data.name);
  
  res.status(200).send({
    mensagem: 'Usando post',
    name, avatar_url
  });

});

module.exports = router;