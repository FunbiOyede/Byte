const {
    USER_SERVICE,
    EVENT_DISPATCHER,
    USER_REGISTERED,
    REGISTRATION_VALIDATION_SCHEMA,
  } = require("../utils/constant");
  const {validate} = require("../utils/validate");
  const { Container } = require("typedi");
  const {generateAccessToken} = require("../utils/jwt")
  const Bcrypt = require("bcrypt");
  const BaseController = require('./base.controller');



class RegisterController extends BaseController {
    constructor(){
      super();

        this.UserService = Container.get(USER_SERVICE);
        this.register = this.register.bind(this);
        this.EventEmitter = Container.get(EVENT_DISPATCHER);
    }
    async register(request, response) {
        //create user generate token send response
    
        const { body } = request;
     
       
      const validatedData =  validate(body, REGISTRATION_VALIDATION_SCHEMA);
     
        const user = await this.UserService.createUser({
          ...validatedData,
          password: Bcrypt.hashSync(body.password, Bcrypt.genSaltSync(10)),
        });

        const token = generateAccessToken(user, true);

        this.EventEmitter.emit(USER_REGISTERED, user);

        this.successResponse(response, { user, token });
      }
    
}

module.exports = RegisterController;