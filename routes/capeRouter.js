/**
 * Created by voot on 6/17/17.
 */

var express = require('express');
var router = express.Router();
var makecape = require('../controllers/makecape')

/* GET Cape Listing */
/* Shows 5 capes by default */
router.get('/', function (req, res, next){
    res.render('cape');
});

/* GET Cape/ID Listing */
/* Displays a specific cape entry*/
router.get('/:capeId', function(req, res, next){

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