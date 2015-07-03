var Joi = require('joi');
var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
var <%=apiNameSlug%>DDL = use('apis/<%=apiNameSlug%>/ddl')();
//    <% if(includeRedis){ %>
var storage = use('apis/<%=apiNameSlug%>/redisStore')();
//   <% } %>

module.exports = {
    description: "Modify(or add) <%=apiNameSlug%>",
    notes: "Modifies <%=apiNameSlug%>. Implementor add other details ...",
    tags: ['api', '<%=apiNameSlug%>'],
    validate: {
        params: {
            uid: Joi.string().required().description("<%=apiNameSlug%> unique id"),
        },
        payload: <%=apiNameSlug%>DDL.schema
    },
    plugins: {
        'hapi-swagger': {
            responseMessages: [
                {code: 200, message: 'OK'},
                {code: 201, message: 'Created'},
//                {code: 304, message: '[uid] is not associated with a <%=apiNameSlug%>'},
                {code: 500, message: 'system error'}
            ]
        }
    },
    handler: function (request, reply) {
        Logger.info("storing %j at %s", request.payload);
        // Storage
        //    <% if(includeRedis){ %>
        var redisClient = request.server.plugins['hapi-redis'].client;
       storage.store(redisClient, request.params, request.payload, function(data,err){
           if(err) {
               Logger.error ("store returned", err);
               reply({uid:"no uid"}).code(406)
           }
           else if(data) {
               Logger.debug("find returned %s", data);
               reply(request.payload).code(201);
           }
           else
               reply(request.payload).code(200);
       });<% } else {%>
    if (request.params.uid.indexOf("-999")===0)
        reply({uid:"no uid"}).code(404);
    else
        reply(request.payload).code(200);<% }%>
    },
    response: {schema: <%=apiNameSlug%>DDL.schema}
};


