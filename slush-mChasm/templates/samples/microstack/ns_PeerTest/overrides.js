/**
 *
 * Overrides to topology configuration for each process-env.NODE_ENV supported
 */
module.exports.Config = function (environment) {
    var _config = {
        projectName: 'ns_PeerTest',
        filter: environment,
        environment: {
            $filter: 'env',
            development: {
                nanostack: {
                    testProp: 'foundpeer-development'
                }
            },
            local_docker: {
                nanostack: {
                    testProp: 'foundpeer-local_docker',
                }
            },
            production: {
                nanostack: {
                    testProp: 'foundpeer-production',
                }
            },
            test: {
                nanostack: {
                    testProp: 'foundpeer-test',
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
