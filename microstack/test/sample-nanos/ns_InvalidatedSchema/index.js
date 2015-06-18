module.exports = function () {
    module = {};
// Load overrides to configuration
    var overrides = require('./overrides.js').Config(process.env.NODE_ENV);
//
// Store the nanostack configuration override values for all relevant environments
    var store = new (require('confidence')).Store(overrides);
//
// Retrieve overrides for the current environment
    var envConfig = store.get('/environment/nanostack', {env: process.env.NODE_ENV});
//
// Apply overrides to the base nanostack topology configuration
    var Hoek = require('hoek');
    var nanostackConfig = Hoek.applyToDefaults(require('./base.js').Config(process.env.NODE_ENV), envConfig);
//
// Export the nanostack topology for usage in other modules
    module.nanostack = nanostackConfig;
    module.schema = require('./schema.js');
    return module;
}
