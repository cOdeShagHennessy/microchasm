var Joi = require('joi');
var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
var <%=apiNameSlug%>DDL = use('apis/<%=apiNameSlug%>/ddl')();
//    <% if(includeRedis){ %>
var storage = use('apis/<%=apiNameSlug%>/redisStore')();
//   <% } %>

module.exports = {
    description: "Delete <%=apiNameSlug%>",
    notes: "Delete <%=apiNameSlug%>. Implementor add other details ...",
    tags: ['api', '<%=apiNameSlug%>'],
    validate: {
         params: {
             uid: Joi.string().required().description("<%=apiNameSlug%> unique id"),
         }
    },
    plugins: {
        'hapi-swagger': {
            responseMessages: [
                {code: 204, message: "Successfully deleted <%=apiNameSlug%>"},
//                {code: 304, message: '[uid] is not associated with a <%=apiNameSlug%>'},
                {code: 500, message: 'system error'}
            ]
        }
    },
    handler: function (request, reply) {
        Logger.info("deleting %j at %s", request.params);
        // Storage
        //    <% if(includeRedis){ %>
        var redisClient = request.server.plugins['hapi-redis'].client;
        storage.delete(redisClient, request.params, request.query, function(err){
            if(err) {
                Logger.error ("delete returned", err);
                reply().code(404)
            }
            else  {
                Logger.debug("deleted <%=apiNameSlug%> with uid = " + request.params.uid);
                reply().code(204);
            }
        });<% } else {%>
        if (request.params.uid.indexOf("-999")===0)
            reply().code(404);
        else
            reply().code(204);<% }%>
    }

};


