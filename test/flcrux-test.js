'use strict';

const _  = require('underscore');
const expect = require('chai').expect;

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
    expect(FLCrux).to.be.ok;
  });

  it('should instantiate' , function() {
    expect(flc).to.be.ok;
  });

  it('should subscribe to expected listeners on init', function() {
    const expectedSubs = ['join', 'message'];
    flc.init();
    const lm = mockClient.listenerMap;
    _.each(expectedSubs, (event) => {
      expect(lm).to.have.property(event).and.be.ok;
    });
  });

  it('should have loaded given plugins', function() {
    const expectedPlugins = ['test', 'person'];
    flc.init();
    _.each(expectedPlugins, (plugin) => {
      expect(flc._plugins).to.have.property(plugin).and.be.ok;
    });
  });
});
