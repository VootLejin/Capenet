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
        $scope.heroes = [
            {name: "Joe", classifications: [
                {name: "Mover",     level: 0},
                {name: "Shaker",    level: 0},
                {name: "Brute",     level: 0},
                {name: "Breaker",   level: 0},
                {name: "Master",    level: 0},
                {name: "Tinker",    level: 0},
                {name: "Blaster",   level: 0},
                {name: "Thinker",   level: 0},
                {name: "Striker",   level: 0},
                {name: "Changer",   level: 0},
                {name: "Trump",     level: 0},
                {name: "Stranger",  level: 0}
                ]
            }

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