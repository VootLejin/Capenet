/**
 * Created by voot on 6/20/17.
 */
var expect = require("chai").expect;
var request = require("request");
var getuser = require("../app/controllers/getusers");

var url = "http://localhost:3000/";

describe("Cape Listing Website", function(){
    describe("Get a list of Users", function(){
        it("gets a list of all users", function() {
            request(url + 'users', function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
    describe("Make a new User", function(){
        it("makes a new user", function(){

        });
    });
})