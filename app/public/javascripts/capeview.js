/**
 * Created by voot on 6/21/17.
 */

'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/capeview', {
        templateUrl : 'views/capeview.html',
        controller  : 'capeViewController'
    }).
    when('/capeview/id/:id',{
        templateUrl : 'views/capeview.html',
        controller  : 'capeViewIdController'
    });
}]);

app.controller('capeViewController', function($scope,$http,$routeParams, capeHandlingFactory){
    $scope.capeHandlingFactory = capeHandlingFactory;
    $scope.cape = capeHandlingFactory.singleCape;
});

app.controller('capeViewIdController', function($scope,$http,$routeParams, capeHandlingFactory){
    var id = $routeParams.id;
    $http.get('cape/id/'+id).then(function success(response){
        capeHandlingFactory.singleCape = response.data;
        $scope.cape = capeHandlingFactory.singleCape;
    }, function failure(response){

    });
});