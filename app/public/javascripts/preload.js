/**
 * Created by voot on 6/19/17.
 */

var app = angular.module('capenet', ['ngRoute', 'ngResource']);

/*var cleanCapeModel = function() {
    return {
        name: '',
        powerTheme: '',
        creationMethod: '',
        powers: [],
        description: '',
        dateCreated: Date,
        creator: ''
    };
};
    */

app.factory('capeHandlingFactory', function userModel($rootScope){
    return{
        singleCape : {},
        capeList : []
    }
});