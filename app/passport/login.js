/**
 * Created by voot on 6/22/17.
 */
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/usermodel');
var bCrypt = require('bcrypt-nodejs');

var passportLogin = function(passport) {

    // use( name of strategy, type)
    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
        // Check for User
            User.findOne({'username': username},
                function (err, user) {
                    // Error on DB end
                    if (err)
                        return done(err);
                    // User does not exist or Password is wrong
                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        return done(null, false,
                            req.flash('message', 'Username and password combo not found'));
                    }
                    if(!isValidPassword(user, password)){
                        console.log('Password doesn\'t match with username ' + username);
                        return done(null, false,
                            req.flash('message', 'Username and password combo not found'));
                    }

                    // user and password both match
                    return done(null, user);
                });
        }
    ));

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
};

module.exports = passportLogin;