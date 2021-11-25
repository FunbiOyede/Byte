const Joi = require("joi");
module.exports = {

  USER_SERVICE: "user.service",
  REGISTER_CONTROLLER: "register.controller",
  LOGIN_CONTROLLER: "login.controller",
  USER_REGISTERED: "user.registered",
  USER_LOGGED_IN: "user.loggedin",
  EVENT_DISPATCHER: "event.dispatcher",
  USER_MODEL: "user.model",
  REGISTRATION_VALIDATION_SCHEMA: {
    name: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
  LOGIN_VALIDATION_SCHEMA: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};
