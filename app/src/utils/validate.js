const Joi = require("joi");
const { BadRequest } = require("../utils/error");
/**
 * @description validates data from incoming requests
 * @param {obj} data 
 * @param {obj} validationSchema 
 */
const validate = (data, validationSchema) => {
  const schema = Joi.object(validationSchema);
  const validation = schema.validate(data);
  if (validation.error) {
    throw new BadRequest(validation.error.details[0].message);
  }
};

module.exports = {
  validate,
};
