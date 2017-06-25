/**
 * Created by voot on 6/13/17.
 */

var Mongoose = require('mongoose');
var dbUrl = require('../db.js').url;
var auth = require('../db.js').auth;
var myConnection = Mongoose.connect(dbUrl, auth);

var userSchema = new Mongoose.Schema({

    username: {
        type: String,
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    email:{
        type: String
    },
    password:{
        type: String
    }

});

var User = myConnection.model('Capeusers', userSchema);

module.exports = User;

