const mongoose = require('mongoose');
// require('dotenv').config()

const mongo = 'mongodb+srv://admin:admin@cluster0-nfulh.gcp.mongodb.net/catsDB?retryWrites=true&w=majority'

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
mongoose.Promise = global.Promise;

module.exports= mongoose;
