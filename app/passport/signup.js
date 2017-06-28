/**
 * Created by voot on 6/22/17.
 */
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/usermodel');
var bCrypt = require('bcrypt-nodejs');

var passportSignup = function(passport){

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
        },
        function(req, username, password, done){
            findOrCreateUser = function(){
                // Validate the Name Length
                if (username.length > 24){
                    console.log('username too long: ' + username.length);
                    return done(null, false, req.flash('message', 'Name too long'));
                }
                User.findOne({'username' : username}, function (err, user){
                    if (err){
                        console.log('Error in Signup');
                        return done(err);
                    }

                    // User already exists
                    if (user){
                        console.log('User already Exists, username: ' + username);
                        return done(null, false, req.flash('message', 'User already exists'));
                    } else {
                        // No User yet.
                        var newUser = new User();

                        // Set fields...
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email'); // I didn't know you could do this
                        newUser.created = Date.now();

                        // Save user
                        newUser.save(function(err){
                            if (err){
                                console.log('Error saving New User');
                                throw err;
                            }
                            console.log('User Registered');
                            return done (null, newUser);
                        });
                    }

                });
            };
            process.nextTick(findOrCreateUser);
        }
    ));

    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};

module.exports = passportSignup;