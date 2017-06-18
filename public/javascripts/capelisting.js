/**
 * Created by voot on 6/18/17.
 */

var app = angular.module('capeListing',[]);

app.controller('capelistingctrl', function($scope, $http){
    // initializers
    $scope.capeList = [];

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

    /*
     * addEntry adds entries to the current list of capes
     */
    $scope.addEntry = function(callback){

    };
});