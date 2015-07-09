/**
 * Base topology configuration. Only need to supply overrides for values being changed for specific environments being supported.
 *
 */
module.exports.Config = function (environment) {
    return {
        filter: environment,
        id: 'nanostack',
        redisHost: process.env.REDIS_HOST || '192.168.59.103',
        mqHost: '192.168.59.103'
    }
};
