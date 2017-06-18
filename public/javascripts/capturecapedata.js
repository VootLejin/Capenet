/**
 * Created by voot on 6/17/17.
 */

var app = angular.module('capeData',[]);

app.controller('capeDataController', function($scope, $http){
    $scope.name = 'John Doe';

    $scope.submit = function(){
        var capeInfo = {cape:{name: $scope.name}};
        $http.post("/cape", capeInfo)
            .then(function success(response){
                $scope.creator = response.data.creator;
            });
    };

});