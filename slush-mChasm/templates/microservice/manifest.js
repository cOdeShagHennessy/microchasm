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
//            './apis/sms': [{
//                routes: {
//                    prefix: '/sms'
//                }
//            }],
//            './apis/newsfeed': [{
//                routes: {
//                    prefix: '/newsfeed'
//                }
//            }]

        }
    };

    return module;
};

