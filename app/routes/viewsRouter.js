/**
 * Created by voot on 6/19/17.
 */

var express = require('express');
var router = express.Router();

/* GET Default View */
router.get('/:view', function(req, res){
   res.render(req.params.view);
});
/*
router.get('/', function (req, res, next){
    res.render('home');
});

router.get('/home', function (req, res, next){
    res.render('home');
});
*/

module.exports = router;