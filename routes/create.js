const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
    
    try {

        const discord = req.body.discord
        console.log(discord)
        if(  User.findOne({discord})) {
            return res.status(500).send({ error: "Usuario ja existe" });
        }

        const user =  User.create(req.body);
        return  res.send({ user });

    } catch (err) {

        return res.status(500).send({ error: "fail register" });

    }
});

module.exports = app => app.use('/auth', router)