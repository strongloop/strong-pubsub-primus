// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: strong-pubsub-primus
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var helper = require('strong-pubsub-test');
var http = require('http');
var Primus = require('primus');
var PrimusTransport = require(ROOT);
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');
var Connection = require('strong-pubsub-connection-mqtt');

describe('transport', function() {
  beforeEach(function setUpServer(done) {
    var test = this;
    helper.getFreePort(function(port) {
      test.port = port;
      var httpServer = http.createServer();
      test.primus = new Primus(httpServer, {
        transformer: 'engine.io',
        parser: 'binary'
      });
      httpServer.listen(port, done);
    });
  });

  beforeEach(function setUpClient(done) {
    var test = this;
    var topic = test.topic = 'my topic';
    var message = test.message = 'my message';
    var client = new Client({
      host: 'localhost',
      port: this.port
    }, Adapter, PrimusTransport);
    client.publish(topic, new Buffer(message));
    this.primus.on('connection', function(conn) {
      var mqttConn = new Connection(conn);
      mqttConn.on('connect', function(connectPacket) {
        mqttConn.ack('connect', connectPacket);
      });
      mqttConn.on('publish', function(publishPacket) {
        test.received = publishPacket;
        done();
      });
    });
  });

  it('should send the correct packet', function() {
    expect(this.received.message.toString()).to.equal(this.message);
    expect(this.received.topic.toString()).to.equal(this.topic);
  });
});
