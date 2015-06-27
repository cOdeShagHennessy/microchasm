var Joi = require('joi');
var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
var <%=apiNameSlug%>DDL = use('apis/<%=apiNameSlug%>/ddl')();
//    <% if(includeRedis){ %>
var storage = use('apis/<%=apiNameSlug%>/redisStore')();
//   <% } %>

module.exports = {
    description: "Retrieve <%=apiNameSlug%>",
    notes: "Returns <%=apiNameSlug%>. Implementator add other details ...",
    tags: ['api', '<%=apiNameSlug%>'],
    validate: {
        params: {
            uid: Joi.string().required().description("<%=apiNameSlug%> unique id"),
        }
    },
    plugins: {
        'hapi-swagger': {
            responseMessages: [
                {code: 200, message: 'OK'},
                {code: 304, message: '[uid] is not associated with a <%=apiNameSlug%>'},
                {code: 500, message: 'system error'}
            ]
        }
    },
    handler: function (request, reply) {
        Logger.info("request %s %s", request.method, request.path, request.params, request.query);
        // Storage
        //    <% if(includeRedis){ %>
        var redisClient =request.server.plugins['hapi-redis'].client;
        storage.find(redisClient, request.params, request.query, function(data,err){
            if(err) {
                Logger.error ("find  returned ", err);
                reply({}).code(304)
            }
            else if(data) {
                Logger.debug("find returned %s", data);
                reply(data);
            }
            else
                reply({});
        });<% } else {%>
         reply({});<% }%>
    },
    response: {schema: <%=apiNameSlug%>DDL.schema}
};

