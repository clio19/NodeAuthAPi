const Joi = require("joi");

module.exports = {
  validateBody: (user) => {
    return (req, res, next) => {
      // const result = Joi.validate(req.body, schema);
      const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });

      return Joi.assert(user, schema);

      // if (schema.error) {
      //   return res.status(400).json(schema.error);
      // }

      // if (!req.value) {
      //   req.value = {};
      // }
      // req.value["body"] = schema.value;

      // const validation = schema.validate(req.body);
      // res.send(validation);

      // next();
    };
  },

  // schemas: {
  //   authSchema: Joi.object().keys({
  //     email: Joi.string().email().required(),
  //     password: Joi.string().required(),
  //   }),
  // },
};
