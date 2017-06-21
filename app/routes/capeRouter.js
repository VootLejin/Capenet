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
/* GET Cape/search */
/* Used for Generic Searches*/

router.get('/search', function(req,res,next){
    var searchCriteria = req.query;
    // Should verify this is a JSON object
    // Should Strip out unused fields

    for(var key in searchCriteria){
        if(searchCriteria[key] === ''){
            delete searchCriteria[key];
        }
    }

    CapeController.getCapesByFields(searchCriteria, function(err, result){
        if (err){
            res.send({error:"No Cape Found (cape/search GET getCapesByFields)"});
        } else {
            if (result.length < 1){
                res.send({error:"No Cape Found"})
            } else {
                res.send(result);
            }
        }
    });

});

/* POST routes */
/* Default POST Route */
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

/* POST Cape/search */
/* Used for Generic Searches
 * expects a JSON object named searchObject */
router.post('/search', function(req,res,next){
    var searchCriteria = req.body;
    // Should verify this is a JSON object
    // Should Strip out unused fields
    for(var key in searchCriteria){
        if(searchCriteria[key] === ''){
            delete searchCriteria[key];
        }
    }
    console.log(searchCriteria);
    CapeController.getCapesByFields(searchCriteria, function(err, result){
        if (err){
            res.send({error:"No Cape Found"});
        } else {
            res.send(result);
        }
    })
});



module.exports = router;
