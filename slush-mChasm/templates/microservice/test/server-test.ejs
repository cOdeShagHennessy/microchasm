var use = require('rekuire');
var Hapi = require('hapi');
var BDD = use('test/bdd');
var Logger = require('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');

BDD.describe('Main Server', function () {
    BDD.it('require server', function (done) {
        var server = use('server');
        done();
    });
});

BDD.describe('Main Server', function () {
    var server = use('/server');

    BDD.it('expect good plugin', function (done) {
        BDD.expect(server.plugins['good']).to.exist();
        done();
    });

    BDD.it('expect hapi-swagger plugin', function (done) {
        var routes = [];
        server.table()[0].table.forEach(function (item) {
            routes.push(item.path);
        });
        Logger.debug('routes %s', JSON.stringify(routes, null, '\t'));
        BDD.expect(routes.indexOf('/docs/ui')).to.be.at.least(0);
        done();
    });

    <% if(includeRedis){ %>
    BDD.it('expect hapi-redis plugin', function (done) {
        BDD.expect(server.plugins['hapi-redis'], 'hapi-redis not register').to.exist();
        server.plugins['hapi-redis'].client.ping(function(err, res){
            Logger.debug("redis returned %s", res);
            BDD.expect(res, "didn't get a pong for our ping").to.equal('PONG');
            done();
        })
    });
    <% }%>
    //
    // ##@addMicroAPIExpectation for any apis loaded into manifest @##
//    BDD.it('expect microapi', function (done) {
//        var routes = [];
//        server.table()[0].table.forEach(function (item) {
//            routes.push(item.path);
//        });
//        Logger.debug('routes %s', JSON.stringify(routes, null, '\t'));
//        BDD.expect(routes.indexOf('/microapi/ping')).to.be.at.least(0);
//        done();
//    });
});

BDD.describe('Plugins', function () {
    var server = new Hapi.Server();
    server.connection({
        port: 3004
    });

    server.register({
        register: require('good'),
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    }, function (err) {
        BDD.expect(err).to.not.exist();
    });

    BDD.it('Register good plugin', function (done) {
        Logger.debug('test good-console', {this: 23});
        BDD.expect(server.plugins['good']).to.exist();
        done();
    });

    <% if(includeRedis){ %>
    BDD.it('Register hapi-redis plugin', function (done) {
        var Config = use('config/base')(use('microstack'));
        server.register({
            register: require('hapi-redis'),
            options: {host: Config.get('redisHost')}
        }, function () {

            BDD.expect(server.plugins['hapi-redis'], 'hapi-redis not register').to.exist();
            server.plugins['hapi-redis'].client.ping(function(err, res){
                Logger.debug("redis returned %s", res);
                BDD.expect(res, "didn't get a pong for our ping").to.equal('PONG');
                done();
            });
        })
    });
    <% }%>
});


