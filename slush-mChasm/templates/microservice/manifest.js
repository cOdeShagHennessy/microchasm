var use = require('rekuire');
var version = use('/package.json').version;

module.exports = function (Config) {
    var module = {};

    module.props = {
        server : {
            app: Config
        },
        connections: [{
            port: Config.get('port'),
            labels: ['environment']
        }],
        plugins: {
            'good': {
                reporters: [{
                    reporter: require('good-console'),
                    events: {
                        response: '*',
                        log: '*'
                    }
                }]
            },
            'hapi-swagger': {
                apiVersion: version,
                documentationPath: '/docs/ui',
                endpoint: '/docs.json',
                payloadType: 'json',
                produces: 'json',
                info: {
                    title: '<%=chasmNameSlug%> <%=serviceNameSlug%> API',
                    description: '<%=descHuman%>'

                }
            },
            //<insert new microapi above this line>

            // microlibs
            //<insert new microlib above this line>

        }
    };

    return module;
};

