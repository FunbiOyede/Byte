const Joi = require("joi");
const { BadRequest } = require("../utils/error");
/**
 * @description validates data from incoming requests
 * @param {obj} data 
 * @param {obj} validationSchema 
 * @returns {obj} validated data
 */
const validate = (data, validationSchema) => {
  
  const schema = Joi.object(validationSchema);

  const validatedData = schema.validate(data);

  if (validatedData.error) {
    throw new BadRequest(validatedData.error.details[0].message);
  }

  return validatedData.value
};

module.exports = {
  validate,
};
