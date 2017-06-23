/**
 * Created by voot on 6/22/17.
 */

var isAuthenticated = function(req, res, next){
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
};

module.exports = isAuthenticated;