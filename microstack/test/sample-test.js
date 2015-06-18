var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
var BDD = use('bdd');
var rootPath = '../';

BDD.describe('microstack', function () {

   BDD.it('Validate loading (default)', function (done) {
      process.env.NODE_ENV = 'default';
      Logger.info('ENV = %s', process.env.NODE_ENV);
      BDD.expect(process.env.NODE_ENV).to.equal('default');
      var microStack = use(rootPath)([{name:'this',path:'test/sample-nanos/ns_This'}]);
      var ns_This = microStack.nanos('this');
      Logger.test(ns_This);
      BDD.expect(ns_This).to.exist();
      BDD.expect(ns_This.redisHost).to.exist();
      BDD.expect(ns_This.redisHost).to.equal('192.168.59.103');
      BDD.expect(ns_This.filter).to.equal('default');
      done();
   });
   BDD.it('Validate loading nanostack (production) ', function (done) {
      process.env.NODE_ENV = 'production';
      Logger.info('ENV = %s', process.env.NODE_ENV);
      BDD.expect(process.env.NODE_ENV).to.equal('production');
      var microStack = use(rootPath)([{name:'this',path:'test/sample-nanos/ns_This'}]);
      var ns_This = microStack.nanos('this');
      Logger.test(ns_This);
      BDD.expect(ns_This).to.exist();
      BDD.expect(ns_This.redisHost).to.exist();
      BDD.expect(ns_This.redisHost).to.equal('needredisprod');
      BDD.expect(ns_This.filter).to.equal('production');
      done();
   });
   BDD.it('Load multiple stacks (default)', function (done) {
      process.env.NODE_ENV = 'default';
      Logger.info('ENV = %s', process.env.NODE_ENV);
      BDD.expect(process.env.NODE_ENV).to.equal('default');
      var microStack = use(rootPath)([
         {name:'this',path:'test/sample-nanos/ns_This'},
         {name:'that',path:'test/sample-nanos/ns_That'}
      ]);
      var ns_This = microStack.nanos('this');
      Logger.test(ns_This);
      BDD.expect(ns_This).to.exist();
      BDD.expect(ns_This.redisHost).to.exist();
      BDD.expect(ns_This.redisHost).to.equal('192.168.59.103');
      BDD.expect(ns_This.filter).to.equal('default');
      var ns_That = microStack.nanos('that');
      Logger.test(ns_That);
      BDD.expect(ns_That).to.exist();
      BDD.expect(ns_That.testProp).to.exist();
      BDD.expect(ns_That.testProp).to.equal('foundthat-' + process.env.NODE_ENV);
      done();
   });

   BDD.it('Load peer nanostacks (default)', function (done) {
      process.env.NODE_ENV = 'default';
      Logger.info('ENV = %s', process.env.NODE_ENV);
      BDD.expect(process.env.NODE_ENV).to.equal('default');
      var microStack = use(rootPath)([
         {name:'peer',path:'ns_PeerTest'}
      ]);
      var ns_Peer = microStack.nanos('peer');
      Logger.test('nsPeer', ns_Peer);
      BDD.expect(ns_Peer).to.exist();
      BDD.expect(ns_Peer.testProp).to.exist();
      BDD.expect(ns_Peer.testProp).to.equal('foundpeer-' + process.env.NODE_ENV);
      done();
   });

   BDD.it('Invalidate nano against schema(default)', function (done) {
      process.env.NODE_ENV = 'default';
      var microStack = use(rootPath)([
         {name:'invalid',path:'test/sample-nanos/ns_InvalidatedSchema'}
      ]);
      var ns_Inv = microStack.nanos('invalid');
      BDD.expect(ns_Inv).to.not.exist();
      done();
   });

});

