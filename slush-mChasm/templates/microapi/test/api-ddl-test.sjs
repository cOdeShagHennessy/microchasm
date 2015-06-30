var use = require('rekuire');
var Joi = require('joi');
var BDD = use('test/bdd');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'test', process.env.LOG_STYLE || '');

BDD.describe("<%=apiNameSlug%> DDL(Data Definition Language) Test", function () {
    var requestSchema = use('apis/<%=apiNameSlug%>/ddl')().schema

    BDD.it("validate <%=apiNameSlug%> DDL", function (done) {
        var <%=apiNameSlug%>DO = {
            uid:"AND019FID0123",
            sample: 'sample value'
        }

        Joi.validate(
            <%=apiNameSlug%>DO,
            requestSchema, {abortEarly: false, allowUnknown: true}, function (err) {
                if (err)
                    Logger.test('Error: invalidated %j %s', <%=apiNameSlug%>DO, err);
                BDD.expect(err).to.not.exist();
                Logger.test('validated %j', <%=apiNameSlug%>DO);
                done();
            });
        Logger.test("Assertions: %d", BDD.count());
        Logger.test("Incomplete assertions: %d", BDD.incomplete());
    });

    BDD.it("Invalidate <%=apiNameSlug%> DDL w/o required field", function (done) {
        var <%=apiNameSlug%>DO = {
            sample: 'sample value but no uid property'
        }
        Joi.validate(
            <%=apiNameSlug%>DO,
            requestSchema, {abortEarly: false, allowUnknown: true}, function (err) {
                BDD.expect(err).to.exist();
                Logger.test('invalidated %j', <%=apiNameSlug%>DO);
                done();
            });
        Logger.test("Assertions: %d", BDD.count());
        Logger.test("Incomplete assertions: %d", BDD.incomplete());
    });
});


