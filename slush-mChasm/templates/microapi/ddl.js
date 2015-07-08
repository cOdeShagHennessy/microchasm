var Joi = require('joi');

module.exports = function () {
    var module = {};

    var properties = {
        uid: Joi.string().required().description("Unique identifier for <%=apiNameSlug%>"),
        sample:Joi.string().description("Describe this field")
    };

    module.properties = properties;

    module.schema= Joi.object({
        uid: properties.uid,
        sample: properties.sample
    }).meta({
        className: "<%=apiNameSlug%>",
        description: "<%=descHuman%>"
    });

    return module
};
