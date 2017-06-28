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

app.controller('userSignInController', function($scope, $http, $rootScope){
    $scope.signin = function(username, password){
        var data = {
            username: username,
            password: password
        };
        $http.post('/user/login', data)
            .then(function success(response){
                if(response.data._status ==='success') {
                    $scope.message = "Signed in as " + response.data.user;
                    $rootScope.username = response.data.user;
                } else {
                    $scope.message = "Failed to Sign in!";
                }
            }, function failure(response){
                $scope.message = "Failed to Sign in!";
            });
    };
});

app.controller('userSignUpController', function($scope, $http, $rootScope){
    $scope.signup = function(username, password){
        var data = {
            username: username,
            password: password
        };

        $http.post('/user/signup', data)
            .then(function success(response){
                if(response.data._status ==="success"){
                    $rootScope.username = response.data.user;
                    $scope.message = "Sign-up Succeeded. Welcome, " + $rootScope.username + "!";
                } else {
                    console.log(response.data);
                    $scope.message = "Failed to sign up: "+ response.data._reason;
                }
                $scope.newuser = '';
                $scope.password = '';

            }, function failure(response){
                $scope.message = "Failed to signup (Failure Response)";
                $scope.newuser = '';
                $scope.password = '';
            })
    };
});