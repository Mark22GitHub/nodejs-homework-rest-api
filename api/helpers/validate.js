const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
  favorite: Joi.bool(),
});

exports.updateContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
}).min(1);

exports.updateStatusContactSchema = Joi.object({
  favorite: Joi.bool(),
});

exports.validateIDSchema = Joi.object({
  contactId: Joi.objectId(),
});

exports.signUpValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = "Please specify a valid password.";
        }
      });
      return errors;
    }),
  name: Joi.string(),
});
