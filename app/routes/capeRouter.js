/**
 * Created by voot on 6/17/17.
 */

var express = require('express');
var router = express.Router();
var CapeController = require('../controllers/cape');
var onHeaders = require('on-headers');

function scrubETag(res){
    onHeaders(res, function(){
        this.removeHeader('Etag');
    })
}

var stripFields = function(arguments){
    for(var key in arguments){
        if(arguments[key] === ''){
            delete arguments[key];
        }
    }
    return arguments;
};

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
    scrubETag(res);
    CapeController.randomcape(function(err, result){
        if(err){

        }
        res.send(result);
    });

});

/* GET Cape/search */
/* Used for Generic Searches*/
router.get('/search', function(req,res,next){
    scrubETag(res);
    // Should Strip out unused fields
    var searchCriteria = stripFields(req.query);

    // Hand to Controller
    CapeController.getCapesByFields(searchCriteria, function(err, result){
        if (err){
            res.send({error:"No Cape Found (cape/search GET getCapesByFields)"});
        } else {
            if (result.length < 1){
                res.send({error:"No Cape Found"})
            } else {
                console.log(result);
                res.send(result);
            }
        }
    });

});

/* POST routes */
/* Default POST Route */
router.post('/', function(req, res, next){
    scrubETag(res);
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
    scrubETag(res);
    // Strip out unused fields
    var searchCriteria = stripFields(req.body);
    CapeController.getCapesByFields(searchCriteria, function(err, result){
        if (err){
            res.send({error:"No Cape Found"});
        } else {
            console.log(result);
            res.send(result);
        }
    })
});

/* POST Cape/id/:capeId */
/* Used to edit Cape Entries */
router.post('/id/:capeId', function(req, res, next){
    scrubETag(res);
    var updateInfo = req.body.cape;
    var id = req.params.capeId;
    CapeController.editCape(id, updateInfo, function (err, result){
        if(err){
            res.send({error: "Error on editing the cape (pre-result)"});
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

/* Post cape/delete */
/* Used to delete cape entries. */
router.post('/delete/:capeId', function(req, res, next){

    scrubETag(res);
    var id = req.params.capeId;
    console.log("Deleting Cape, Id: " + id);
    CapeController.deleteCape(id, function(err, result){
        if(err){

        } else {
            res.send(result);
        }
    })
});



module.exports = router;
