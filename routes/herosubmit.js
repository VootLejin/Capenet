/**
 * Created by voot on 5/18/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/herosubmit', function(req, res, next) {
        response = { // creates response
            // sets the name field in response to stuff from our body
            name:req.body.heroes.name
        };
        console.log(response);
        res.end(JSON.stringify(response));
});

module.exports = router;