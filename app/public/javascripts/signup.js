/**
 * Created by voot on 6/23/17.
 */

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/signup', {
        templateUrl : 'views/signup.html',
        controller  : 'userSignUpController'
    });
}]);

app.controller('userSignUpController', function($scope, $http){
    $scope.username = '';
    $scope.signup = function(username, password){
        var data = {
            username: username,
            password: password
        };
        $http.post('/user/signup', data)
            .then(function success(response){
                $scope.message = "Successful Response";
                console.log(response);
                $scope. username ='';
                $scope.password = '';
            }, function failure(response){
                $scope.message = "Failure Response";
                console.log(response);
            });
    };
});