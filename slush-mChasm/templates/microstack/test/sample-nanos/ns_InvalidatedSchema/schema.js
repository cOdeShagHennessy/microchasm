/**
 * Created by mbp-sm on 5/4/15.
 */
var Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.string().required(),
    testProp: Joi.string().required()
});