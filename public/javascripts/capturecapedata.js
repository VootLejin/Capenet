/**
 * Created by voot on 6/17/17.
 */

var app = angular.module('capeData',[]);

app.controller('capeDataController', function($scope, $http){
    //$scope.name = 'John Doe';

    $scope.lazyInit = function(){
        $scope.name = "Fat Man";
        $scope.description = "Able to Eat an Entire sandwich in one bite, no matter the size. No, really, you should of seen it!";
    }
    $scope.submit = function(){
        var capeInfo = {cape:{name: $scope.name}};
        $http.post("/cape", capeInfo)
            .then(function success(response){
                $scope.creator = response.data.creator;
            });
    };

});