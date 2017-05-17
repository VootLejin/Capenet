/**
 * Created by voot on 5/11/17.
 */

// Ok, lets break this down...
    //Declare a variable app
            // From the node Package angular's Module Method
            // The Module is called flapperNews
var app = angular.module('flapperNews', []);

// Creates a controller in app
    // Name MainCtrl
app.controller('MainCtrl',[
    '$scope',
    function($scope){
        $scope.test = "Hello, World!";
        $scope.players = [
            {name: "mike", level: 125},
            {name: "alex", level: 19},
            {name: "matt", level: 35}
        ];
        $scope.addPlayer = function(){
            if(!$scope.title || $scope.title === ''){return;}
            if(!$scope.level || $scope.level === 0){return;}
            $scope.players.push({name: $scope.title, level: $scope.level});
            $scope.title = '';
            $scope.level = 0;
        };
        $scope.incrementLevel = function(player){
            player.level += 1;
        };
        $scope.decrementLevel = function(player){
            player.level -= 1;
        };
    }
]);