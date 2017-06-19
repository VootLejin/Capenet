/**
 * Created by voot on 6/19/17.
 */
'use strict';



app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'mainController'
    });
}]);

app.controller('mainController', function($scope) {
    $scope.message = "Hello from Home!";
});