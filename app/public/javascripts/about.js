/**
 * Created by voot on 7/4/17.
 */
app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/about', {
        templateUrl : 'views/about.html'
    });
}]);