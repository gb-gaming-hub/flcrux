'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function(pluginDir) {
  // Unless explicitly overriden, will load plugin directly from location where
  // node was run from.
  const _pluginDir = pluginDir || './plugins'
  const loadedPlugins = {};
  fs.readdirSync(_pluginDir).forEach((file) => {
    const pName = file.split('.')[0];
    const pluginCtor = require(path.join(_pluginDir, pName));
    loadedPlugins[pName] = new pluginCtor();
  });

  return loadedPlugins;
}

