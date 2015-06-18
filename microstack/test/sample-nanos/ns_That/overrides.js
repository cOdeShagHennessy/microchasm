/**
 *
 * Overrides to topology configuration for each process-env.NODE_ENV supported
 */
module.exports.Config = function (environment) {
    var _config = {
        projectName: 'ns_That',
        filter: environment,
        environment: {
            $filter: 'env',
            development: {
                nanostack: {
                    testProp: 'foundthat-development'
                }
            },
            local_docker: {
                nanostack: {
                    testProp: 'foundthat-local_docker',
                }
            },
            production: {
                nanostack: {
                    testProp: 'foundthat-production',
                }
            },
            test: {
                nanostack: {
                    testProp: 'foundthat-test',
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
