var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landingpage');
});

/*
router.get('/#/', function(req, res, next){
  res.render('landingpage');
});
*/

module.exports = router;
