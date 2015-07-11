/**
 * Created by cOdeShagHennessy on 7/10/15.
 */
var Joi = require('joi');

module.exports = Joi.object().keys({
    uid: Joi.string().required(),
    testProp: Joi.string().required()
});