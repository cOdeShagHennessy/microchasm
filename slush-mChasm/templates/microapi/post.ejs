var Joi = require('joi');
var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
var <%= apiNameSlug %>DDL = use('apis/<%=apiNameSlug%>/ddl')();
//    <% if(includeRedis){ %>
var storage = use('apis/<%=apiNameSlug%>/redisStore')();
//   <% } %>

module.exports = {
    description: "Create a new <%=apiNameSlug%>",
    notes:       "Creates a new <%=apiNameSlug%>. Implementor add other details ...",
    tags:        ['api', '<%=apiNameSlug%>'],
    validate:    {
        payload: {
//            sample: Joi.string().description("<%=apiNameSlug%> sample property"),
            sample:<%= apiNameSlug %>DDL.properties.sample
        }
    },
    plugins:     {
        'hapi-swagger': {
            responseMessages: [
                {code: 200, message: 'OK'},
                {code: 201, message: 'Created'},
                {code: 422, message: '<%=apiNameSlug%> could not be created'},
                {code: 500, message: 'system error'}
            ]
        }
    },
    handler:     function (request, reply) {
        Logger.info("storing %j at %s", request.payload);
        // Storage
        //    <% if(includeRedis){ %>
        var redisClient = request.server.plugins['hapi-redis'].client;
        storage.store(redisClient, request.params, request.payload, function (data, err) {
            if (err) {
                Logger.error("store returned", err);
                reply({uid: "no uid"}).code(422)
            }
            else if (data && data.exists) {
                Logger.debug("find returned %s", data);
                reply(request.payload).code(200);
            }
            else
                reply({uid:data.uid,sample:data.sample}).created("/" + data.uid);
        });
        <% } else{ %>
        if(request.payload.sample === "-999")
            reply({uid: "no uid"}).code(422);
        else
            reply({uid: "generateduid", sample:request.payload.sample}).created("/generateduid");<% }%>
        },
        response: { schema: <%= apiNameSlug %>DDL.schema }
} ;
