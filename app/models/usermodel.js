/**
 * Created by voot on 6/13/17.
 */

var Mongoose = require('mongoose');
var myConnection = Mongoose.connect('mongodb://localhost/capenet');

var userSchema = new Mongoose.Schema({

    userName: {
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

