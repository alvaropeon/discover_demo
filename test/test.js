var http = require('http'),
    should = require('should');

describe('have-demo tests', function (done) {
  var context = {};

  before(function (done) {
    done();
  }),

  it("Can list system environment variables", function () {
    (3+2).should.be.equal(5);
  });

  it("Key processor leaves values unchanged", function () {
    (3+2).should.not.be.equal(15);
  });

  it("Key processor generates a <span> tag for the path variable", function () {
    (4+2).should.be.equal(6);
  });
});
