var express = require('express');
var router = express.Router();
var makeuser = require('../controllers/makeuser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  makeuser();
  res.send('respond with a resource');
});

router.post('/', function(req,res, next){
  makeuser(req.body.name);
  res.send('Posted with name: ' + req.body.name);
});
module.exports = router;
