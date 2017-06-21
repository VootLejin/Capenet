/**
 * Created by voot on 6/21/17.
 */

'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/capeedit', {
        templateUrl : 'views/capeedit.html',
        controller  : 'capeEditController'
    });
}]);

app.controller('capeEditController', function($scope, $http, capeHandlingFactory) {
    console.log(capeHandlingFactory.capeList);
    $scope.defaultClasses = ['Mover', 'Shaker', 'Brute', 'Breaker',
        'Master', 'Tinker', 'Blaster', 'Thinker',
        'Striker', 'Changer', 'Trump', 'Stranger'];
    $scope.powers = [{classification: 'Mover', rating: 0}];
    $scope.basePoints = 0;
    $scope.points = 0;
    $scope.deleteCount = 0;

    $scope.cape = capeHandlingFactory.capeList[0];

    $scope.submit = function(){
        var capeInfo = {cape:{
            name: $scope.cape.name,
            description: $scope.cape.description,
            powers: $scope.cape.powers,
            powerTheme: $scope.cape.powerTheme,
            creator: $scope.cape.creator}};
        $http.post("/cape/id/" + $scope.cape._id, capeInfo)
            .then(function success(response){
                $scope.creator = response.data.creator;
            });
    };

    $scope.addPowerClass = function(){
        $scope.cape.powers.push({classification: 'Mover', rating: 0});
    };

    $scope.verifyDelete = function(){
        if($scope.deleteCount < 1){
            $scope.deleteCount = 1;
            alert("You are about to Delete this cape! Click the Delete button again to do so.");
        } else {
            $http.post("/cape/delete/" + $scope.cape._id).then(function success(response){
                alert("Cape Deleted");
            });
        }

    }

});