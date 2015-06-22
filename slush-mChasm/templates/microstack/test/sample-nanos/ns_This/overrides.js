/**
 *
 * Overrides to topology configuration for each process-env.NODE_ENV supported
 */
module.exports.Config = function (environment) {
    var _config = {
        projectName: 'ns_This',
        filter: environment,
        environment: {
            $filter: 'env',
            development: {
                nanostack: {
                    mqHost: 'ec2-54-174-36-110.compute-1.amazonaws.com'
                }
            },
            local_docker: {
                nanostack: {
                    mqHost: '192.168.59.103',
                }
            },
            production: {
                nanostack: {
                    redisHost: process.env.REDIS_HOST || 'needredisprod',
                    mqHost: 'ec2-54-174-36-110.compute-1.amazonaws.com',
                }
            },
            test: {
                nanostack: {
                    id: 'nanostack',
                    mqHost: 'ec2-54-174-36-110.compute-1.amazonaws.com',
                }
            },
            $default: {
                nanostack: { // this accepts the base configuration}
                }
            }
        }
    }
    return _config;
};
