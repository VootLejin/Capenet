/**
 * Created by voot on 6/18/17.
 */

var Cape = require('../models/capemodel');

var randomcape = function(callback){
    Cape.findRandom().limit(1).exec(function(error, cb){
        if(error){
            console.log('randomcape error');
        }
        callback(null, cb[0]);
    });
};

module.exports = randomcape;