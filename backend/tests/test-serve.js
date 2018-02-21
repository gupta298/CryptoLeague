var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
  it('should list ALL Users on /all_users POST');
  it('should list a current User on /user GET', function(done) {
  	chai.request(server)
    .get('/user')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
  it('should update a the User on /app/updateUser PUT');
});