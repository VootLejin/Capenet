/**
 * Created by voot on 6/17/17.
 */

var app = angular.module('capeData',[]);

app.controller('capeDataController', function($scope, $http){
    //$scope.name = 'John Doe';
    $scope.defaultClasses = ['Mover', 'Shaker', 'Brute', 'Breaker',
        'Master', 'Tinker', 'Blaster', 'Thinker',
        'Striker', 'Changer', 'Trump', 'Stranger'];
    $scope.powers = [{classification: 'Mover', rating: 0}];
    $scope.basePoints = 0;
    $scope.points = 0;

    $scope.lazyInit = function(){
        $scope.name = "Fat Man";
        $scope.description = "Able to Eat an Entire sandwich in one bite, no matter the size. No, really, you should of seen it!";
    };

    $scope.submit = function(){
        var capeInfo = {cape:{
            name: $scope.name,
            description: $scope.description,
            powers: $scope.powers,
            powerTheme: $scope.powerTheme}};
        $http.post("/cape", capeInfo)
            .then(function success(response){
                $scope.creator = response.data.creator;
            });
    };

    $scope.addPowerClass = function(){
        $scope.powers.push({classification: 'Mover', rating: 0});
    };

    $scope.randomPower = function(){
        // roll d20, get value
        $scope.points = Math.floor(Math.random()*20)+1;
        // get # of classes
        var numClasses = Math.floor(Math.random() * 3) + 1;
        if ($scope.points > 10) {
            numClasses +=1;
        }
        $scope.numClasses = numClasses;
        // get random classes
        $scope.powers=[];
        var classID =0;
        for(var i = 0; i < numClasses; i++){
            //console.log("Adding power Class");
            $scope.addPowerClass();
            //console.log("Picking Class...");
            classID = Math.floor(Math.random() * $scope.defaultClasses.length);
            //console.log("Adding Class: " + classID);
            //console.log($scope.defaultClasses[classID]);
            $scope.powers[i] = {classification: $scope.defaultClasses[classID], rating: 0};
        }

    };

});