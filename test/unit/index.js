// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: strong-pubsub-primus
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var Transport = require(ROOT);

describe('index', function(done) {
  describe('createConnection', function() {
    it('should be exposed as a function', function() {
      expect(Transport.createConnection).to.be.a('function');
    });
  });
});
