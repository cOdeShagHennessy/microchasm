var use = require('rekuire');
var BDD = use('test/bdd');
var Logger = require('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');

BDD.describe('One test', function () {
    BDD.it('one ', function (done) {
        Logger.debug("Run sample test");
        done();
    });
});
