var Hoek = require('hoek');
// Load overrides to configuration
module.exports = function () {
    module = {};
    var overrides = require('./overrides.js').Config(process.env.NODE_ENV);
// Store the nanostack configuration override values for all relevant environments
    var store = new (require('confidence')).Store(overrides);
//
// Retrieve overrides for the current environment
    var envConfig = store.get('/environment/nanostack', {env: process.env.NODE_ENV});
    //console.log('overrides = ' + JSON.stringify(envConfig, null, '\t'));
//
// Apply overrides to the base nanostack topology configuration
    var nanostackConfig = Hoek.applyToDefaults(require('./base.js').Config(process.env.NODE_ENV), envConfig);
    //console.log('nanostack = ' + JSON.stringify(nanostackConfig.impl, null, '\t'));
//
// Export the nanostack topology for usage in other modules
    module.nanostack = nanostackConfig;
    module.schema = require('./schema.js');
    return module;
}
