'use strict';

const assert = require('assert');
const irc = require('irc');
const pluginLoader = require('./plugin-loader');

class FLCrux {
  constructor(opts){
    assert('config' in opts, "`config` missing from FLCrux ctor options hash ");

    this._config = opts.config;

    if('client' in opts) {
      this._client = opts['client'];
    } else {
      const clientOpts = {};
      clientOpts = config.userName || config.botName;
      this._client = new irc.Client(config.server, config.botName, clientOpts);
    }
  }

  init() {
    const self = this;

    this._loadPlugins();

    // Event bindings
    this._client.addListener(
      'join', function() { self._onJoin.apply(self, arguments); });
    this._client.addListener(
      'message', function() { self._onMessage.apply(self, arguments); });
  }

  ////////////////////////////////////////////////////////////
  // Handlers
  ////////////////////////////////////////////////////////////
  _onJoin(channel, who) {
    // TODO: Impl
    console.log('_onJoin triggered');
  }

  _onMessage(from, to, text, message) {
    // TODO: Impl
    console.log('_onMessage triggered');
  }

  ////////////////////////////////////////////////////////////
  // Internal
  ////////////////////////////////////////////////////////////
  _loadPlugins() {
    this._plugins = pluginLoader(this._config.pluginDir);
  }
}

module.exports = FLCrux;
