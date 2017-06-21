/**
 * Created by voot on 6/21/17.
 */

var app = angular.module('capenet',['ngRoute', 'ngResource']);

app.factory('capeHandlingFactory', function userModel($rootScope){
    return{
        singleCape : {},
        capeList : []
    }
});