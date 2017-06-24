var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/authentication');

var index = function(passport){
  /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('landingpage');
    });

    router.get('/sessioninfo', function(req, res){
        if (typeof req.user !== 'undefined') {
            res.send({username: req.user.username});
        }
        res.end();
    });

    return router;
};

module.exports = index;
