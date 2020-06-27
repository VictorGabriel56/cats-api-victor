const { Mongoose } = require("mongoose")

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0-nfulh.gcp.mongodb.net/cats?retryWrites=true&w=majority', {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;

