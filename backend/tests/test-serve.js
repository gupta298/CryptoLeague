var chai = require('chai');
var chaiHttp = require('chai-http');
//var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
  it('should list ALL Users on //app/all_users POST');
  it('should list a current User on /app/user GET');
  it('should update a the User on /app/updateUser PUT');
});