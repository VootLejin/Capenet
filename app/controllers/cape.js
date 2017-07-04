/**
 * Created by voot on 6/21/17.
 */

var Cape = require('../models/capemodel');
// Because we have to update the user on edits and creation
var User = require('../models/usermodel');

var canSubmit = function(result, callback){
    var now = Date.now();
    var elapsed = now - result.lastSubmissionDate;
    if (elapsed < 60000 ){ // 1 minute in milliseconds
        callback(false);
    } else {
        callback(true);
    }
};
var checkCapeSubmissionDelay = function(user, capeInfo, callback){
  User.findOne({username: user}, 'lastSubmissionDate', function(err, result){
    canSubmit(result, function(abletopost){
        if(abletopost){
            makeCape(capeInfo, user, callback);
        } else {
            callback(null, {failed: true, _reason:'You must wait one minute between cape submissions'});
        }
    })
  });
};

var makeCape = function(capeInfo, user, callback){
    var myCape = new Cape({});

    //set dateCreated
    myCape.dateCreated = Date.now();

    //set creator
    myCape.creator = user;


    //set name
    if(capeInfo.name){
        if(capeInfo.name.length > 32){
            myCape.name = 'unnamed'
        } else {
            myCape.name = capeInfo.name;
        }

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

    // Save Cape
    myCape.save(function(err, savedCape, numEffected){
        if (err)
            callback(err);
        // Now update user
        User.updateLastSubmission(user, savedCape._id, function(err){
            if (err){
                callback(err);
            }
        })
    });

    callback(null, myCape);
};
var CapeController = {
    /* Create */
    makeCape    : function(capeInfo,user, callback){
        // Check if user is able to make new cape
        checkCapeSubmissionDelay(user, capeInfo, callback);


    },

    /* Read */
    getCapeById : function(capeInfo, callback){
        Cape.findOne({_id : capeInfo},Cape.defaultResults, function(err, cape){
            callback(null, cape);
        })
    },
    getCapesByFields : function (searchInfo, callback){
        Cape.find(searchInfo).
            limit(10).
            select(Cape.defaultResults).
            exec(function(err, capeList){
                //var results = {results : []};

                callback(null,capeList);
        });
    },
    getCapesByRecent : function (startingSpot, callback) {
        var start = 0;
        if (startingSpot) {
            start = startingSpot;
        }
        Cape.find({})
            .skip(start)
            .limit(10)
            .sort({dateCreated: -1})
            .exec(function (err, capeList) {
                callback(null, capeList);
            });
    },

    randomcape  : function(callback){
        Cape.findRandom().limit(1).exec(function(error, cb){
            if(error){
                console.log('randomcape error');
            }
            callback(null, cb[0]);
        });
    },

    /* Update */
    editCape    : function(id, capeInfo, editor, callback){
        Cape.update({_id: id, creator: editor}, { $set: capeInfo}, callback);
    },

    /* Delete */
    deleteCape  : function(id, user, callback){
        Cape.remove({_id: id, creator:user}, callback);
    }
};

module.exports = CapeController;