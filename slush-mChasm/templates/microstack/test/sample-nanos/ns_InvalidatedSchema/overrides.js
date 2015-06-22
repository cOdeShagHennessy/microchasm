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
            test: {
                nanostack: {
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
