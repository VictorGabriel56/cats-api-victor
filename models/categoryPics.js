const mongoose = require('../database/db');

const CategorySchema = new mongoose.Schema({
    Category:{
        type: String,
        require: true,
    },
    Url1:{
        type: String,
        require: true,
    },
    Url2:{
        type: String,
        require: true,
    },
    Url3:{
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;