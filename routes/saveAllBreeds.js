const express = require('express');
const Breeds = require('../models/breeds')
const router = express.Router();
const length = require('length')
// const https = require('https');
const { default: Axios } = require('axios');
// const { json } = require('body-parser');
// const { response } = require('../app');


router.get('/',async (req,res,next) => {


    const user = await Axios.get("https://api.thecatapi.com/v1/breeds", {
      headers: {
        'x-api-key': '8676dee6-65f2-4574-afd5-58d94c7c01ce'
      }
  })

  var i= 0;
  console.log(1);
  console.log(i);
  console.log(user.data.lengt);
  

  let CatFilter = [];

  user.data.forEach(async (value) => {
        // CatFilter[index] = {
        //     id: value.id,
        //     temperament: value.temperament,
        //     origin: value.origin,
        //     description: value.description,
        // }
      
        
        const {id, temperament, origin, description} = value;

        const breeds = await Breeds.create({
            id,
            temperament,
            origin,
            description
        })
        res.send({breeds});

        
    });
  

//   console.log(2);
//   console.log(user.data[i].id);

// };
  // console.log(fodase);
  // const{id} = user.data;

  // let teste = [user.data.id]   
  console.log(3);

  // let item = {  
  //   origin: url,  
  //   origin: avatar_url  
  // }; 

  // var data = new Breeds(item); 
  // data.save();
 
  // console.log(user);
 
  res.status(200).send({
    mensagem: 'Usando post',
    // temperament, origin, id, description
  });

});

module.exports = app => app.use('/save', router);