/**
 * Created by voot on 6/21/17.
 */

'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/capesearch', {
        templateUrl : 'views/capesearch.html',
        controller  : 'capeSearchController'
    });
}]);

app.controller('capeSearchController', function($scope,$http, capeHandlingFactory){
    $scope.submitSearch = function(callback){
        delete $scope.searchResults;
        $http.get('cape/search', {
            params : {name: $scope.name,
                powerTheme: $scope.powerTheme,
                creationMethod: $scope.creationMethod,
                powers : $scope.powers, //This is a toughone
                //description: $scope.description,
                //dateCreated : $scope.dateCreated,
                creator: $scope.creator
            }
        }).then(function success(response){
            // Successfully reached the server
            // check that we didn't get error
            $scope.searchResults = response.data;
            // update Cape Handler
            if($scope.searchResults.length === 1){
                capeHandlingFactory.singleCape = $scope.searchResults[0];
            } else {
                capeHandlingFactory.capeList = $scope.searchResults;
            }

        }, function failure(response){
            // Failed to Reach server
        });
    };
});