/**
 * Created by voot on 6/17/17.
 */

var Mongoose = require('mongoose');
var random = require('mongoose-random');
var dbUrl = require('../db.js').url;
var opts = require('../db.js').opts;
var myConnection = Mongoose.connect(dbUrl, opts);

var capeSchema = new Mongoose.Schema({
    name: {
        type: String,
        default: 'Jyhn Doe'
    },
    powerTheme: String,
    creationMethod: String,
    powers: [{classification: String, rating: Number}],
    description: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: String
    }
});

var defaultResults = 'name powerTheme creationMethod powers description dateCreated creator _id';

capeSchema.plugin(random);

var Cape = myConnection.model('Capecharacters', capeSchema);

module.exports = Cape;
module.exports.defaultResults = defaultResults;
