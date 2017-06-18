/**
 * Created by voot on 6/17/17.
 */

var express = require('express');
var router = express.Router();
var makecape = require('../controllers/makecape');
var randomcape = require('../controllers/getrandomcape');

/* GET Cape Listing */
/* Shows 5 capes by default */
router.get('/', function (req, res, next){
    res.render('capeedit');
});

/* GET Cape/ID Listing */
/* Displays a specific cape entry*/
router.get('/:capeId(\d+)', function(req, res, next){

});

/* GET Cape/random Listing */
/* gets a random(?) cape from the Database */
router.get('/random', function(req, res, next){
    var capeList = [];
    randomcape(function(err, result){
        if(err){

        }
        res.send(result);
        //res.send(capeList);
    });

});


/* POST routes */
router.post('/', function(req, res, next){
    makecape(req.body.cape, function(err, result){
        if (err){
            //Error Handling
            console.log("Error: POST /cape")
        } else {
            res.send(result);
        }
    });
});



module.exports = router;