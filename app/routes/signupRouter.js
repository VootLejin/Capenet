/**
 * Created by voot on 6/22/17.
 */

var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/authentication');

var signupRoute = function(passport){
    router.get('/', function(req, res){
        res.render('signup', {message : req.flash('message')});
    });

    router.post('/', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));


    return router;
};

module.exports = signupRoute;