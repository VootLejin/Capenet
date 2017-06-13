/**
 * Created by voot on 6/13/17.
 */

var Mongoose = require('mongoose');
var myConnection = Mongoose.connect('mongodb://localhost/capenet');

var userSchema = new Mongoose.Schema({
    name: {
        type: String,
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

var User = myConnection.model('Capeusers', userSchema);

module.exports = User;

