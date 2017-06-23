var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/authentication');
var makeuser = require('../controllers/makeuser');
var getusers = require('../controllers/getusers');

var userRoute = function(passport){
    /* GET users listing. */
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
    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', {user: req.user});
    });

    /* User Session handling */
    /* logging in */
    router.post('/login', passport.authenticate('login',{
        successRedirect :'/user/home',
        failureRedirect : '/',
        failureFlash : true
    }));
    /* logging out */
    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
    /* Signing up */
    /* view */
    router.get('/', function(req, res){
        res.render('signup', {message : req.flash('message')});
    });

    /* submission */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/user/signup',
        failureFlash : true
    }));


    return router;
};

module.exports = userRoute;
