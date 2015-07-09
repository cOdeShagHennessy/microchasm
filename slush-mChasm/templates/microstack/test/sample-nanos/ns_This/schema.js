/**
 *
 */
var Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.string().required(),
    redisHost: Joi.string().required(),
    mqHost: Joi.string().required()
});