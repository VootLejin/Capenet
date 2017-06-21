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
    console.log(capeHandlingFactory.capeList);
    $scope.capeHandlingFactory = capeHandlingFactory;
    $scope.cape = capeHandlingFactory.capeList[0];
});

app.controller('capeViewIdController', function($scope,$http,$routeParams, capeHandlingFactory){
    console.log(capeHandlingFactory.capeList);
    $scope.capeHandlingFactory = capeHandlingFactory;
    var id = $routeParams.id;
    $http.get('cape/id/'+id).then(function success(response){
        capeHandlingFactory.setSingleCape(response.data);
        $scope.cape = capeHandlingFactory.capeList[0];
    }, function failure(response){

    });
});