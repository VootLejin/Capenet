/**
 * Created by voot on 6/20/17.
 */
var chai = require('chai');
var should = chai.should();
var chaihttp = require('chai-http');
var url = "http://localhost:3000/";

chai.use(chaihttp);
var request = chai.request;

describe("Cape CRUD operations", function(){
    describe("Search specific fields", function(){
        it("gets a cape based off of Id", function(done){
            request(url).
                get('cape/id/594810e311d2321875beb56b').
                end(function(err, result){
                    result.should.have.status(200);
                    done();
                    //console.log(result['body']);
            });
        });
        it("Gets a cape based off of name", function(done){
            var params = {
                    name: 'Manhattan',
                    powerTheme: '',
                    creationMethod: '',
                    powers: [],
                    description: '',
                    dateCreated: Date,
                    creator: ''
            };


            request(url).
                get('cape/search').
                query(params).
                end( function(err, response, body){
                    response.statusCode.should.equal(200);
                    done();
            });
        });

        it("Gets all Capes", function(done){
            request(url).
            get('cape/search').
            query().
            end(function(error, response){
                response.body.should.not.have.property('error');
                //console.log(body.length);
                done();
            });
        });

        it("Fails to get all capes", function(done){
            request(url).
            get('cape/search').
            query({axe:'big'}).
            end(function(err, response){
                //console.log("Words");
                //console.log(response);
                response.body.should.have.property('error');
                done();
            });
        });

    });
});