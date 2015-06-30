var use = require('rekuire');
var BDD = use('test/bdd');
var Logger = require('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');


//TODO: change logging to use Logger.test(...)
BDD.describe('Base Configuration', function () {
    var microstack= use('microstack');

    BDD.it('require base config', function (done) {
        var Config = use('config/base')(microstack);
        Logger.debug("Port: %d", Config.get('port'));
        done();
    });

    BDD.it('config for NODE_ENV=production, check port', function (done) {
        process.env.NODE_ENV = 'production';
        var Config = use('config/base')(microstack);
        Logger.debug("Port: %d", Config.get('port'));
        BDD.expect(Config.get('port')).to.equal(8081);
        done();
    });

});
