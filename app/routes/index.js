var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/authentication');

var index = function(passport){
  /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('landingpage');

    });

    return router;
};

module.exports = index;
