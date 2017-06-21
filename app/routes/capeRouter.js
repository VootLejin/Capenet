/**
 * Created by voot on 6/17/17.
 */

var express = require('express');
var router = express.Router();
var CapeController = require('../controllers/cape');

/* GET Cape Listing */
/* Shows 5 capes by default */
router.get('/', function (req, res, next){
    res.render('capelisting');
});

/* GET Cape Edit */
router.get('/edit', function (req, res, next){
    res.render('capeedit');
});

/* GET Cape/ID Listing */
/* Displays a specific cape entry*/
router.get('/id/:capeId', function(req, res, next){
    console.log(req.params.capeId);
    CapeController.getCapeById(req.params.capeId, function(err, result){
        if(err){
            res.send({error:"No Cape Found"});
        } else {
            res.send(result);
        }
    });
});

/* GET Cape/random Listing */
/* gets a random(?) cape from the Database */
router.get('/random', function(req, res, next){
    var capeList = [];
    CapeController.randomcape(function(err, result){
        if(err){

        }
        res.send(result);
        //res.send(capeList);
    });

});


/* POST routes */
router.post('/', function(req, res, next){
    CapeController.makeCape(req.body.cape, function(err, result){
        if (err){
            //Error Handling
            console.log("Error: POST /cape")
        } else {
            res.send(result);
        }
    });
});



module.exports = router;