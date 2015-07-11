/**
 * Base topology configuration. Only need to supply overrides for values being changed for specific environments being supported.
 *
 */
module.exports.Config = function (environment) {
    return {
        filter: environment,
        uid: 'generated=-id',
        testProp: 'foundpeer-default'
    }
};
