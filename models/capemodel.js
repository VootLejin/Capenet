/**
 * Created by voot on 6/17/17.
 */

var Mongoose = require('mongoose');
var myConnection = Mongoose.connect('mongodb://localhost/capenet');

var capeSchema = new Mongoose.Schema({
    name: {
        type: String,
        default: 'Jyhn Doe'
    },
    powerTheme: String,
    creationMethod: String,
    powers: [{classification: String, rating: Number}],
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Cape = myConnection.model('Capecharacters', capeSchema);

module.exports = Cape;
