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

var actionSucceded = function(reply){
  return reply.data._status ==='success';
};
var actionReason = function(reply){
    return reply.data._reason;
};

app.service('capeHandlingFactory', function userModel($rootScope){
    this.capeList = [];
    this.setSingleCape = function(cape) {
        this.capeList[0] = cape;
        this.capeList.resize(1);
    };
    this.getSingleCape = function(){
        return this.capeList[0];
    }
});

app.run(function($rootScope, $http){
    $rootScope.username = "Not Signed in";
    $http.get('/sessioninfo')
        .then(function success(response){
            console.log(response);
            if(response.data.username){
                $rootScope.username = response.data.username;
            }
        })
    ;
    $rootScope.logout = function(){
        $http.get('/user/logout').then(
            function success(response){
                if(response.data){
                    if(response.data._status === 'success'){
                        $rootScope.username = "Not Signed in";
                    }
                }
            },
            function failure(response){
                console.log(response);
            }
        );
    }
});