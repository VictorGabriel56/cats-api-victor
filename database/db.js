const mongoose = require('mongoose');
require('dotenv').config()

const mongo = process.env.MONGO_URL

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
mongoose.Promise = global.Promise;

module.exports= mongoose;
