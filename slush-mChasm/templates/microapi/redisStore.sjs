var Joi = require('joi');
var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');

module.exports = function () {

    module = {};

    <% if(restGET){ %>
    module.find = function (redisClient, params, query, callback) {
        if (params.uid === "-999") {
            if (callback)
                callback({}, "Could not find");
        }
        else {
            if (callback)
                callback({uid:params.uid,sample:"<%=apiNameSlug%>DDL sample property"});
        }
    };<% }%><% if(restPUT || restPOST){ %>

    module.store = function (redisClient, params, payload, callback) {
        if (payload.sample === "-999") {
            if (callback)
                callback([], "Could not store");
        } else if (payload.sample.indexOf("exists") === 0){
            if (callback)
                callback({uid: "uid exists", sample: payload.sample, exists:true});
        }
        else {
            if (callback)
                callback({uid: "generateduid", sample: payload.sample, exists:false});
        }
    };<% }%><% if(restDELETE){ %>

    module.delete = function (redisClient, params, query, callback) {
        if (callback)
            callback([], 'Could not delete');
    };<% }%>
        

    return module;
}
