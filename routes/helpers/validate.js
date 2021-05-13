const Joi = require("joi");

exports.validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[reqPart]);

    if (error) {
      return res.status(400).send(error);
    }

    next();
  };
};

exports.createContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

exports.updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);
