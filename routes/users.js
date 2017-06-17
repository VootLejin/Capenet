var express = require('express');
var router = express.Router();
var makeuser = require('../controllers/makeuser');
var getusers = require('../controllers/getusers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var userList = { users: [] };
  getusers(userList, function(err, usersArray){
    if (err){
      //Error Response
    }
      usersArray.forEach(function (userName) {
          userList.users.push(userName.name);
      });
      res.render('users', userList);
  });

});

router.post('/', function(req,res, next){
  makeuser(req.body.name);
  res.send('Posted with name: ' + req.body.name);
});
module.exports = router;
