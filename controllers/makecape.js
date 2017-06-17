/**
 * Created by voot on 6/17/17.
 */

var Cape = require('../models/capemodel');

var makecape = function(capeInfo, callback){
    var myCape = new Cape({});

    //set dateCreated
    myCape.dateCreated = Date.now();

    //set creator
    if(capeInfo.creator){
        myCape.creator = capeInfo.creator;
    } else {
        myCape.creator = 'admin';
    }

    //set name
    if(capeInfo.name){
        myCape.name = capeInfo.name;
    } else {
        // To Do, some sort of auto increment for unnamed cases
        myCape.name = 'unnamed';
    }

    //set powerTheme
    if(capeInfo.powerTheme){
        myCape.powerTheme = capeInfo.powerTheme;
    }

    //set creation method
    if(capeInfo.creationMethod){
        myCape.creationMethod = capeInfo.creationMethod;
    }

    //set description
    if (capeInfo.description){
        myCape.description = capeInfo.description;
    }

    //set powers
    if (capeInfo.powers){
        myCape.powers = capeInfo.powers;
    } else {
        myCape.powers[0] = {'classification' : 'Thinker', 'rating' : 0};
    }
    myCape.save();
    console.log(myCape);
    callback(null, myCape);
};

module.exports = makecape;