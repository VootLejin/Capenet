/**
 * Created by voot on 6/19/17.
 */

'use strict';
//var app = angular.module('capenet', ['ngRoute', 'ngResource']);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/capes', {
        templateUrl : 'views/capes.html',
        controller  : 'capeListingController'
    });

}]);

app.controller('capeListingController', function($scope, $http){
    // initializers
    $scope.capeList = [];
    $scope.message = "Cape Listing page!";

    //functions
    /* Fetch gets an entry from the DB */
    $scope.fetch = function(callback){
        // Go to /random, get an entry.
        $http.get('cape/random').then(function success(response){
            $scope.capeList.push(response.data);
        }, function failure(response){
            $scope.capeList.push({ 'name': 'There was an error... (capelisting, fetch)'});
        });
    };



});