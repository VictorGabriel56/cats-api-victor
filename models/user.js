const mongoose = require('../database/db')

const UserSchema = new mongoose.Schema({
    discord: {
        type: String,
        require: true
    },
    nick: {
        type: String,
        require: true
    },
    twitch: {
        type: String,
        require: true
    },
    win: {
        type: String
    },
    lose: {
        type: String
    },
    wo: {
        type: String
    }

});

const User = mongoose.model('User', UserSchema)

module.exports = User;