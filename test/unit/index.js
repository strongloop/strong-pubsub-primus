var Transport = require(ROOT);

describe('index', function(done) {
  describe('createConnection', function() {
    it('should be exposed as a function', function() {
      expect(Transport.createConnection).to.be.a('function');
    });
  });
});
