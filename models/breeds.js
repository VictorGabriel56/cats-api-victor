const mongoose = require('../database/db');

const BreedsSchema = new mongoose.Schema({
    id:{
        type: String,
        require: true,
    },
    temperament:{
        type: String,
        require: true,
    },
    origin:{
        type: String,
        require: true,
    },
    description:{
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
