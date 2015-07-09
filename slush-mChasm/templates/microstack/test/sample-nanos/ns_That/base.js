/**
 * Base topology configuration. Only need to supply overrides for values being changed for specific environments being supported.
 *
 */
module.exports.Config = function (environment) {
    return {
        filter: environment,
        id: 'nanostack',
        testProp: 'foundthat-default'
    }
};
