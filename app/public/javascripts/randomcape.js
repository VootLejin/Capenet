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

app.controller('randomCapeController', function($scope, $http, capeHandlingFactory){
    // initializers
    $scope.cape = {};
    $scope.message = "Cape Listing page!";

    //functions
    /* Fetch gets an entry from the DB */
    $scope.fetch = function(callback){
        // Go to /random, get an entry.
        $http.get('cape/random').then(function success(response){
            capeHandlingFactory.setSingleCape(response.data);
            $scope.cape= capeHandlingFactory.getSingleCape();

        }, function failure(response){
            $scope.cape= { 'name': 'There was an error... (capelisting, fetch)'};
        });
    };


});