"use strict";

var use = require('rekuire');
var Joi = require('joi');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');

Logger.info("Loading microstack");

module.exports = function (stacksToLoad) {
    var nanostacks = {}; // Collection of nano stacks in topology

    var module = {};
    Logger.trace('Type %s', typeof stacksToLoad)
    if (stacksToLoad &&  Object.prototype.toString.call( stacksToLoad ) === '[object Array]') {
        Logger.trace("Loading %s", JSON.stringify(stacksToLoad));
        stacksToLoad.forEach(function (item) {
            Logger.debug("Loading %s", JSON.stringify(item));
            var nano = use(item.path)();
            nanostacks[item.name] = { nanostack:nano.nanostack, schema:nano.schema };
            Logger.trace("Loaded %s", JSON.stringify(nanostacks,null,'\t'));
        });
    } else Logger.warn('No stacks to load');

    module.nanos = function (name) {
        var nano = nanostacks[name];
        if (nano)  {
            Logger.trace('validating %s', name);
            var ret = Joi.validate(
                nano.nanostack,
                nano.schema, {abortEarly: false, allowUnknown: true}, function (err) {
                    if (err || err !== null) {
                        Logger.error('Nanostack invalidated against schema for env [%s]',nano.nanostack.filter, err);
                        return
                    }
                    return nano.nanostack;
                });
            return ret;
        }
        else {
            Logger.warn('Nanostack %s not found', name);
            return
        }
    };
    return module;
};