/**
 * Created by voot on 6/19/17.
 */

'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/capecreation', {
        templateUrl : 'views/capecreation.html',
        controller  : 'capeCreationController'
    });
}]);

app.controller('capeCreationController', function($scope, $http){
    $scope.defaultClasses = ['Mover', 'Shaker', 'Brute', 'Breaker',
        'Master', 'Tinker', 'Blaster', 'Thinker',
        'Striker', 'Changer', 'Trump', 'Stranger'];

    $scope.basePoints = 0;
    $scope.points = 0;
    $scope.cape = {};
    $scope.cape.powers = [{classification: 'Mover', rating: 0}];

    $scope.lazyInit = function(){
        $scope.name = "Fat Man";
        $scope.description = "Able to Eat an Entire sandwich in one bite, no matter the size. No, really, you should of seen it!";
    };

    $scope.submit = function(){
        var capeInfo = {cape:{
            name: $scope.cape.name,
            description: $scope.cape.description,
            powers: $scope.cape.powers,
            powerTheme: $scope.cape.powerTheme}};
        $http.post("/cape", capeInfo)
            .then(function success(response){
                // Check for success
                if (actionSucceded(response)){
                    $scope.creator = response.data._cape.creator;
                    $scope.message = 'Cape made!';
                } else {
                    $scope.message = 'There was an error: ' + actionReason(response);
                }
            });
    };

    $scope.addPowerClass = function(){
        $scope.cape.powers.push({classification: 'Mover', rating: 0});
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
        $scope.cape.powers=[];
        var classID =0;
        var availableClasses = $scope.defaultClasses.slice();
        for(var i = 0; i < numClasses; i++){
            //console.log("Adding power Class");
            $scope.addPowerClass();
            //console.log("Picking Class...");
            classID = Math.floor(Math.random() * availableClasses.length);
            //console.log("Adding Class: " + classID);
            //console.log($scope.defaultClasses[classID]);
            $scope.cape.powers[i] = {classification: availableClasses[classID], rating: 0};
            availableClasses.splice(classID, 1);
        }

    };

    $scope.removePower = function(power){
        var index = $scope.cape.powers.indexOf(power);
        if (index > -1){
            $scope.cape.powers.splice(index,1);
        };
    };

});