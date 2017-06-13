/**
 * Created by voot on 6/13/17.
 */
var User = require('../models/user');

var makeuser = function(name) {
    var myUser = new User({});

    //set Date
    myUser.created = Date.now();
    //Check for and set Name
    console.log(name);
    if(name){
        myUser.name = name;
    }

    console.log("Made a new User");
    myUser.save(function (err, user) {
        if (err) return console.error(err);
        console.log("Saved a User");
    });
};

module.exports = makeuser;