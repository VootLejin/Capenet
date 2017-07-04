/**
 * Created by voot on 6/13/17.
 */

var Mongoose = require('mongoose');
var dbUrl = require('../db.js').url;
var opts = require('../db.js').opts;
var myConnection = Mongoose.connect(dbUrl, opts);

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
    },
    lastSubmission:{
        type:Mongoose.Schema.Types.ObjectId
    },
    lastSubmissionDate:{
        type:Date
    },
    lastEdit:{
        type:Mongoose.Schema.Types.ObjectId
    },
    lastEditDate:{
        type:Date
    }

});


userSchema.statics.updateLastSubmission = function(uName, capeID, callback){
    this.findOneAndUpdate({
        username: uName
    }, {
        lastSubmission: capeID,
        lastSubmissionDate: Date.now()
    },
    function(err, user){
        if (err)
            callback(err);
        callback(null);
    });
};


userSchema.statics.updateLastEdit = function(uName, capeID, callback){
    this.findOneAndUpdate({
            username: uName
        }, {
            lastEdit: capeID,
            lastEditDate: Date.now()
        },
        function(err, user){
            if (err)
                callback(err);
            callback(null);
        });
};


var User = myConnection.model('Capeusers', userSchema);

module.exports = User;

