/**
 * Created by voot on 6/21/17.
 */

var app = angular.module('capenet',['ngRoute', 'ngResource', 'infinite-scroll']);
// Throttle Infinite-scroll
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);

app.factory('capeHandlingFactory', function userModel($rootScope){
    return{
        singleCape : {},
        capeList : []
    }
});