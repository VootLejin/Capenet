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
    console.log(capeHandlingFactory.capeList);
    $scope.capeHandlingFactory = capeHandlingFactory;
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
                console.log("1 result");
                capeHandlingFactory.setSingleCape($scope.searchResults[0]);
            } else {
                console.log("many results");
                capeHandlingFactory.capeList = $scope.searchResults;
            }
            console.log($scope.searchResults);

        }, function failure(response){
            // Failed to Reach server
        });
    };
});