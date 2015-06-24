if (!process.env.NODE_ENV)
    process.env.NODE_ENV = 'development';

var use = require('rekuire');
var Logger = require('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
var colors = require('colors/safe');

var Glue = require('glue');
var Config = use('config/base')(use('microstack'));

var Manifest = use('/manifest')(Config);
Logger.debug('Manifest %j', Manifest.props );

var Composer = Glue.compose.bind(Glue, Manifest.props, {relativeTo: __dirname});

Composer(function (err, server) {
    if (err)
        throw err;

    <% if(includeRedis){ %>
    // register this plugin in manifest for some reason cause tests to fail
    // but seems to work fine on server start.
    // registering directly in server.js for now.
    server.register({
        register: require('hapi-redis'),
        options: {host: server.settings.app.get('redisHost')}
    }, function () {
        server.plugins['hapi-redis'].client.ping(function(err, res){
            Logger.debug("redis returned %s", res);
        })
    });
    <% }%>

     /**
      *  Register main index route to redirect to swagger documentation by default
      */
     server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
          reply.redirect('/docs/ui');
       },
    });


   if (!module.parent) {
        server.start(function () {
            var pathBase = require('path').basename(__dirname);
            server.log('starting sever', server.info.uri);
            Logger.info('loading %s [%s]: at %s', 'microservice', colors.green(pathBase), server.info.uri);
        });
    }
    module.exports = server;
});


