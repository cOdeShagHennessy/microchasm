var use = require('rekuire');
var BDD = use('test/bdd');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'test', process.env.LOG_STYLE || '');
var apiPrefix = '/<%=apiNameSlug%>';
//<% if(includeRedis){ %>
var Config = use('config/base')(use('microstack'));//<% } %>

BDD.describe('<%=apiNameSlug%> API Test', function () {
    var uid = 'unit_0000001';
    var Hapi = require('hapi');
    var server = new Hapi.Server();

    BDD.before(function (done) {

        server.connection({
            port: 3004
        });

        server.register(
            {
                register: use('apis/<%=apiNameSlug%>')
            },
            {
                routes: {
                    prefix: apiPrefix
                }
            }, function (err) {
                BDD.expect(err).to.not.exist();
            });
        //<% if(includeRedis){ %>
        server.register({
            register: require('hapi-redis'),
            options:  {host: Config.get('redisHost')}
        }, function () {
            done();
        });//<% } else {%>
        done();
        //<% } %>
    });

    BDD.it('Test <%=apiNameSlug%> plugin loads from the manifest', function (done) {
        var routes = [];
        server.table()[0].table.forEach(function (item) {
            routes.push(item.path);
        });
        Logger.test('routes %s', JSON.stringify(routes, null, '\t'));
        // <% if(restPING){ %>
        BDD.expect(routes.indexOf(apiPrefix + '/ping')).to.be.at.least(0);//<% } %>
        Logger.test("Assertions: %d", BDD.count());
        Logger.test("Incomplete assertions: %d", BDD.incomplete());
        done();
    });
    // <% if(restPING){ %>
    BDD.it(' <%=apiNameSlug%>/ping returns 200', function (done) {
        var options = {
            method: "GET",
            url:    apiPrefix + '/ping'
        };
        server.inject(options, function (response) {
            var result = response.result;
            Logger.test('url =' + JSON.stringify(response.request.path, null, '\t'));
            BDD.expect(response.request.path).to.equal(apiPrefix + '/ping');
            BDD.expect(response.statusCode).to.equal(200);
            BDD.expect(response.result).to.equal('PONG');
            Logger.test("Assertions: %d", BDD.count());
            Logger.test("Incomplete assertions: %d", BDD.incomplete());
            done();
        });
    });//<% } if(restPUT){ %>
    /**
     * This test requires preexising data
     */
    BDD.it('PUT <%=apiNameSlug%>/{uid} returns 201 ', function (done) {
        var options = {
            method:  "PUT",
            url:     apiPrefix + '/' + uid,
            params:  {
                uid: uid
            },
            payload: {
                uid: uid,
                sample:    "this is a sample"
            }
        };
        server.inject(options, function (response) {
            Logger.test('url = %s response = %s', JSON.stringify(response.request.path, null, '\t'), JSON.stringify(response.result));
            BDD.expect(response.request.path).to.equal(apiPrefix + '/' + uid);
            BDD.expect(response.statusCode).to.equal(201);
            BDD.expect(response.result).to.contain({ uid: "unit_0000001", sample: "this is a sample" });
            Logger.test("Assertions: %d", BDD.count());
            Logger.test("Incomplete assertions: %d", BDD.incomplete());
            done();
        });
    });//<% } if(restPUT){ %>
   BDD.it('PUT <%=apiNameSlug%>/{uid} returns 200 ', function (done) {
        var options = {
            method:  "PUT",
            url:     apiPrefix + '/' + uid,
            params:  {
                uid: uid
            },
            payload: {
                uid: uid,
                sample:    "exists"
            }
        };
        server.inject(options, function (response) {
            Logger.test('url = %s response = %s', JSON.stringify(response.request.path, null, '\t'), JSON.stringify(response.result));
            BDD.expect(response.request.path).to.equal(apiPrefix + '/' + uid);
            BDD.expect(response.statusCode).to.equal(200);
            BDD.expect(response.result).to.contain({ uid: "unit_0000001", sample: "exists" });
            Logger.test("Assertions: %d", BDD.count());
            Logger.test("Incomplete assertions: %d", BDD.incomplete());
            done();
        });
        });//<% } if(restPUT){ %>
    BDD.it('PUT <%=apiNameSlug%>/{uid} returns 404', function (done) {
        var uid = "-999";
        var options = {
            method:  "PUT",
            url:     apiPrefix + '/' + uid,
            params:  {
                uid: uid
            },
            payload: {
                uid: uid,
                sample:    "this is a sample"
            }
        };
        server.inject(options, function (response) {
            Logger.test('url = %s response = %s', JSON.stringify(response.request.path, null, '\t'), JSON.stringify(response.result));
            BDD.expect(response.request.path).to.equal(apiPrefix + '/' + uid);
            BDD.expect(response.statusCode).to.equal(404);
            Logger.test("Assertions: %d", BDD.count());
            Logger.test("Incomplete assertions: %d", BDD.incomplete());
            done();
        });
    });//<% } if(restPOST){ %>
    /**
     * This test requires preexising data
     */
    BDD.it('POST <%=apiNameSlug%> returns 200 ', function (done) {
        var options = {
            method:  "POST",
             url:     apiPrefix,
             payload: {
                sample:"sample property"
             }
        };
        server.inject(options, function (response) {
            Logger.test('url = %s response = %s', JSON.stringify(response.request.path, null, '\t'), JSON.stringify(response.result));
            Logger.test('response = %s', JSON.stringify(response.headers, null, '\t'));
            BDD.expect(response.headers.location).to.equal('/generateduid');
            BDD.expect(response.statusCode).to.equal(201);
            BDD.expect(response.result).to.contain({ uid: "generateduid", sample: "sample property" });
            Logger.test("Assertions: %d", BDD.count());
            Logger.test("Incomplete assertions: %d", BDD.incomplete());
            done();
        });
    });//<% } if(restPOST){ %>
    BDD.it(' POST <%=apiNameSlug%> returns 422 ', function (done) {
         var options = {
             method:  "POST",
             url:     apiPrefix,
             payload: {
                 sample:"-999"
             }
         };
         server.inject(options, function (response) {
             Logger.test('url = %s response = %s', JSON.stringify(response.request.path, null, '\t'), JSON.stringify(response.result));
             BDD.expect(response.statusCode).to.equal(422);
             BDD.expect(response.result).to.contain({ uid: "no uid"});
             Logger.test("Assertions: %d", BDD.count());
             Logger.test("Incomplete assertions: %d", BDD.incomplete());
             done();
         });
    });//<% } if(restGET){ %>
    BDD.it('GET <%=apiNameSlug%>/{uid} returns 404, no data for uid', function (done) {
        var options = {
            method: "GET",
            url:    apiPrefix + '/' + "-999"
        };
        server.inject(options, function (response) {
            Logger.test('url =' + JSON.stringify(response.request.path, null, '\t'));
            BDD.expect(response.statusCode).to.equal(404);
            Logger.test("Assertions: %d", BDD.count());
            Logger.test("Incomplete assertions: %d", BDD.incomplete());
            done();
        });
    });//<% } if(restGET){ %>
    BDD.it('GET <%=apiNameSlug%>/{uid} returns 200', function (done) {
        var options = {
            method: "GET",
            url:    apiPrefix + '/' + uid
        };
        server.inject(options, function (response) {
            Logger.test('url =' + JSON.stringify(response.request.path, null, '\t'));
            Logger.test('url =' + JSON.stringify(response.result, null, '\t'));
            BDD.expect(response.request.path).to.equal(apiPrefix + '/' + uid);
            BDD.expect(response.statusCode).to.equal(200);
            done();
        });
        Logger.test("Assertions: %d", BDD.count());
        Logger.test("Incomplete assertions: %d", BDD.incomplete());
    });//<% } if(restDELETE){ %>
    BDD.it('DELETE <%=apiNameSlug%>/{uid} returns 404, no data for uid', function (done) {
        var options = {
            method: "DELETE",
            url:    apiPrefix + '/' + "-999"
        };
        server.inject(options, function (response) {
            Logger.test('url =' + JSON.stringify(response.request.path, null, '\t'));
            BDD.expect(response.statusCode).to.equal(404);
            Logger.test("Assertions: %d", BDD.count());
            Logger.test("Incomplete assertions: %d", BDD.incomplete());
            done();
        });
    });//<% } if(restDELETE){ %>
    BDD.it('DELETE <%=apiNameSlug%>/{uid} returns 204', function (done) {
        var options = {
            method: "DELETE",
            url:    apiPrefix + '/' + uid
        };
        server.inject(options, function (response) {
            Logger.test('url =' + JSON.stringify(response.request.path, null, '\t'));
            Logger.test('url =' + JSON.stringify(response.result, null, '\t'));
            BDD.expect(response.request.path).to.equal(apiPrefix + '/' + uid);
            BDD.expect(response.statusCode).to.equal(204);
            done();
        });
        Logger.test("Assertions: %d", BDD.count());
        Logger.test("Incomplete assertions: %d", BDD.incomplete());
    });//<% } %>

    BDD.after(function (done) {
        //clean up
        done();
    });

});