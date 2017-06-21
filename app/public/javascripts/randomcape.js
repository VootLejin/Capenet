/**
 * Created by voot on 6/19/17.
 */
'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/randomcape', {
        templateUrl : 'views/randomcape.html',
        controller  : 'randomCapeController'
    });

}]);

app.controller('randomCapeController', function($scope, $http){
    // initializers
    $scope.capes = {};
    $scope.message = "Cape Listing page!";

    //functions
    /* Fetch gets an entry from the DB */
    $scope.fetch = function(callback){
        // Go to /random, get an entry.
        $http.get('cape/random').then(function success(response){
            $scope.capes= response.data;
        }, function failure(response){
            $scope.capes= { 'name': 'There was an error... (capelisting, fetch)'};
        });
    };


});