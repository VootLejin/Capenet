/**
 * Created by voot on 6/17/17.
 */
var User = require('../models/usermodel');

var getusers = function(result, callback){
    console.log("Getting Users...");
    User.find(function(err, usersArray) {
        if (err){
            callback(err, null);
        } else {
            callback(null, usersArray);
        }
    });

    console.log("Got Users...");
};

module.exports = getusers;