const mongoose = require('../database/db');

const BreedsSchema = new mongoose.Schema({
    Breed:{
        type: String,
        require: true,
    },
    Temperament:{
        type: String,
        require: true,
    },
    Origin:{
        type: String,
        require: true,
    },
    Description:{
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const Breeds = mongoose.model('Breeds', BreedsSchema);

module.exports = Breeds;
