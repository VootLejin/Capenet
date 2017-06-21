/**
 * Created by voot on 6/19/17.
 */

var app = angular.module('capenet', ['ngRoute', 'ngResource']);
Array.prototype.resize =  function(newSize){
    while (newSize > this.length){
        this.push(0);
    }
    this.length = newSize;
};

app.service('capeHandlingFactory', function userModel($rootScope){
    this.capeList = [];
    this.setSingleCape = function(cape) {
        this.capeList[0] = cape;
        this.capeList.resize(1);
    }
});