var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/authentication');
var getusers = require('../controllers/getusers');

var userRoute = function(passport){
    /* GET user/ listing. */
    router.get('/', function(req, res, next) {
        var userList = { users: [] };
        getusers(userList, function(err, usersArray){
            if (err){
                //Error Response
            } else {
                usersArray.forEach(function (userName) {
                    userList.users.push(userName.name);
                });
                res.render('users', userList);
            }
        });

    });

    /* GET user/home  */
    router.get('/home', isAuthenticated, function(req, res){
        console.log('going to /home');
        console.log('User is logged in');
        res.send({user: req.user.username});
    });

    /* User Session handling */
    /* logging in */
    /* POST user/login  */
    router.post('/login', passport.authenticate('login',{
        successRedirect :'/user/home',
        failureRedirect : '/user/login-fail',
        failureFlash : true
    }));

    /* GET user/login-fail */
    router.get('/login-fail', function(req, res){
        console.log('login-failed');
        console.log(req.user);
        res.send({user: 'failed to log in', users: req.user});
    });

    /* GET user/logout  */
    /* logging out */
    router.get('/logout', function(req, res){
        req.logout();
        res.send({_status:'success'});
    });
    /* Signing up */
    /* GET user/signup  */
    /* view */
    router.get('/signup', function(req, res){
        res.send({message : req.flash('message')});
});

    /* submission */

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/user/signup-success',
        failureRedirect: '/user/signup-fail',
        failureFlash : true
    }));


    /*
    router.post('/signup', function(req, res){
       console.log(req.body);
       res.send({message: "some message"});
    });
    */

    router.get('/signup-success', function(req, res){
        console.log("Successful Signup");
       res.send({message: "Signup Succeeded"});
    });

    router.get('/signup-fail', function(req, res){
        console.log("Failed Signup");
        res.send({message: "Signup Failed"});
    });


    return router;
};

module.exports = userRoute;