var Joi = require('joi');
var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');

module.exports = function () {

    module = {};

    <% if(restGET){ %>
    module.find = function (redisClient, params, query, callback) {
        if (callback)
            callback([], 'Could not find');
    };<% }%><% if(restPUT || restPOST){ %>

    module.store = function (redisClient, params, payload, callback) {
        if (callback)
            callback([], "Could not store");
    };<% }%><% if(restDELETE){ %>

    module.delete = function (redisClient, params, query, callback) {
        if (callback)
            callback([], 'Could not delete');
    };<% }%>
        

    return module;
}
