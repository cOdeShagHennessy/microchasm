/**
 *
 * Overrides to topology configuration for each process-env.NODE_ENV supported
 */
module.exports.Config = function (environment) {
    var _config = {
        projectName: "<%=nsNameSlug%>",
        filter: environment,
        environment: {
            $filter: 'env',
            //<% if(envDEV){ %> NODE_ENV=development
            development: {
                nanostack: {
                    testProp: 'foundpeer-development'
                }
            },//<% } %><% if(envLDOCKER){ %> NODE_ENV=local_docker
            local_docker: {
                nanostack: {
                    testProp: 'foundpeer-local_docker',
                }
            },//<% } %><% if(envPROD){ %> NODE_ENV=production
            production: {
                nanostack: {
                    testProp: 'foundpeer-production',
                }
            },//<% } %><% if(envTEST){ %> NODE_ENV=test
            test: {
                nanostack: {
                    testProp: 'foundpeer-test',
                }
            },// <% } %>
            $default: {
                nanostack: { // this accepts the base configuration
                }
            }
        }
    }
    return _config;
};
