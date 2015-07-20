var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
var BDD = use('bdd');
var rootPath = '../';

BDD.describe('nanostach <%= nsNameSlug %>', function () {

   BDD.it('Validate loading (default)', function (done) {
      process.env.NODE_ENV = 'default';
      Logger.info('ENV = %s', process.env.NODE_ENV);
      BDD.expect(process.env.NODE_ENV).to.equal('default');
      var microStack = use(rootPath)([{name:'<%=nsNameSlug%>',path:'<%=nsNameSlug%>'}]);
      Logger.test(microStack);
      BDD.expect(microStack).to.exist();
//      BDD.expect(microStack.redisHost).to.exist();
//      BDD.expect(ns_This.redisHost).to.equal('192.168.59.103');
//      BDD.expect(ns_This.filter).to.equal('default');
      done();
   });
//   BDD.it('Validate loading nanostack (production) ', function (done) {
//      process.env.NODE_ENV = 'production';
//      Logger.info('ENV = %s', process.env.NODE_ENV);
//      BDD.expect(process.env.NODE_ENV).to.equal('production');
//      var microStack = use(rootPath)([{name:'this',path:'test/sample-nanos/ns_This'}]);
//      var ns_This = microStack.nanos('this');
//      Logger.test(ns_This);
//      BDD.expect(ns_This).to.exist();
//      BDD.expect(ns_This.redisHost).to.exist();
//      BDD.expect(ns_This.redisHost).to.equal('needredisprod');
//      BDD.expect(ns_This.filter).to.equal('production');
//      done();
//   });

});

