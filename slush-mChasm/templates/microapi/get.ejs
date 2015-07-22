var Joi = require('joi');
var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
var <%=apiNameSlug%>DDL = use('apis/<%=apiNameSlug%>/ddl')();
//    <% if(includeRedis){ %>
var storage = use('apis/<%=apiNameSlug%>/redisStore')();
//   <% } %>

module.exports = {
    description: "Retrieve <%=apiNameSlug%>",
    notes: "Returns <%=apiNameSlug%>. Implementor add other details ...",
    tags: ['api', '<%=apiNameSlug%>'],
    validate: {
        params: {
            uid:<%=apiNameSlug%>DDL.properties.uid
        }
    },
    plugins: {
        'hapi-swagger': {
            responseMessages: [
                {code: 200, message: 'OK'},
                {code: 404, message: '[uid] is not associated with a <%=apiNameSlug%>'},
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
                Logger.error ("storage error:", err);
                reply({uid:"no uid"}).code(404)
            }
            else if(data) {
                Logger.debug("find returned %s", data);
                reply(data);
            }
            else
                reply({uid:request.params.uid});
        });<% } else {%>
         if (request.params.uid.indexOf("-999")===0)
            reply({uid:"no uid"}).code(404)
         else
            reply({uid:request.params.uid,sample:"add other properties to <%=apiNameSlug%> DDL"});<% }%>
    },
    response: {schema: <%=apiNameSlug%>DDL.schema}
};

