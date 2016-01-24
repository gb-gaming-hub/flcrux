'use strict';

const _  = require('underscore');
const should = require('should');

const FLCrux = require('../index');
const config = require('./config');
const MockIrcClient = require('./mocks/irc-mock');

let flc;
let mockClient;

describe('flcrux', function() {
  beforeEach(function(){
    mockClient = new MockIrcClient({
      config: config
    });

    flc = new FLCrux({
      config: config,
      client: mockClient
    });
  });

  it('should export flcrux module', function() {
    should.exist(FLCrux);
  });

  it('should instantiate' , function() {
    should.exist(flc);
  });

  it('should subscribe to expected listeners on init', function() {
    const expectedSubs = ['join', 'message'];
    flc.init();
    const lm = mockClient.listenerMap;
    _.each(expectedSubs, (event) => {
      lm.should.have.property(event).which.exists;
    });
  });

  it('should have loaded given plugins', function() {
    const expectedPlugins = ['test', 'person'];
    flc.init();
    _.each(expectedPlugins, (plugin) => {
      flc._plugins.should.have.property(plugin).which.exists;
    });
  });
});
