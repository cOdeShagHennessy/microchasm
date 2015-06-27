var Joi = require('joi');

module.exports = function () {
    var module = {};

    module.schema= Joi.object({
        sample: Joi.string().description('Describe this field')
    }).meta({
        className: '<%=apiNameSlug%>',
        description: "<%=descHuman%>"
    });

    return module
};
