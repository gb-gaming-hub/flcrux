'use strict';
// Mocked out irc client

class MockIrcClient {
  constructor(opts) {
    this.listenerMap = {};
    this.config = opts.config;
  }
  addListener(event, cb) {
    this.listenerMap[event] = cb;
  }
}

module.exports = MockIrcClient;
