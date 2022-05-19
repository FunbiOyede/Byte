const Joi = require("joi");
module.exports = {

  USER_SERVICE: "user.service",
  HOTEL_SERVICE:"hotel.service",
  HOTEL_CONTROLLER:"hotel.controller",
  BOOKING_CONTROLLER:"booking.controller",
  BOOKING_SERVICE:"booking.service",
  REGISTER_CONTROLLER: "register.controller",
  LOGIN_CONTROLLER: "login.controller",
  USER_REGISTERED: "user.registered",
  USER_LOGGED_IN: "user.loggedin",
  EVENT_DISPATCHER: "event.dispatcher",
  USER_MODEL: "user.model",
  HOTEL_MODEL:"hotel.model",
  BOOKING_MODEL:"booking.model",
  ROOM_TYPE_MODEL:"room.type.model",
  ROOM_INVENTORY_MODEL:"room.inventory.model",
  REGISTRATION_VALIDATION_SCHEMA: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().max(8),
    FirstName:Joi.string().required(),
    LastName:Joi.string().required(),                                    
  },
  LOGIN_VALIDATION_SCHEMA: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};
