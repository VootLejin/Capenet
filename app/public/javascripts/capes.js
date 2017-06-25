/**
 * Created by voot on 6/19/17.
 */

'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/capes', {
        templateUrl : 'views/capes.html',
        controller  : 'capeListingController'
    });

}]);

app.controller('capeListingController', function($scope, $http, capeHandlingFactory){
    $scope.capeHandlingFactory = capeHandlingFactory;
    // initializers
    $scope.capeList = [];
    capeHandlingFactory.capeList = [];

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

    $scope.loadCapeList = function(){
        $http.get('cape').then(function success(response){
            console.log(response);
            console.log(response.data);
            $scope.capeList = response.data;
        })
    }
});