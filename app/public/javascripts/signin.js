/**
 * Created by voot on 6/23/17.
 */

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/signin', {
        templateUrl : 'views/signin.html',
        controller  : 'userSignInController'
    });

    $routeProvider.when('/signup', {
        templateUrl : 'views/signup.html',
        controller  : 'userSignUpController'
    });
}]);

app.controller('userSignInController', function($scope, $http){
    $scope.signin = function(username, password){
        var data = {
            username: username,
            password: password
        };
        $http.post('/user/login', data)
            .then(function success(response){
                $scope.message = "Successful Response";
                console.log(response);
            }, function failure(response){
                $scope.message = "Failure Response";
                console.log(response);
            });
    };
});

app.controller('userSignUpController', function($scope, $http){
    $scope.signup = function(username, password){
        console.log(username);
        console.log(password);
        var data = {
            username: username,
            password: password
        };

        $http.post('/user/signup', data)
            .then(function success(response){
                $scope.message = "Successful Response";
                console.log(response);
            }, function failure(response){
                $scope.message = "Failure Response";
                console.log(response);
            });
    };
});