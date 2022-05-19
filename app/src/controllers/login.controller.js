const {
    USER_SERVICE,
    EVENT_DISPATCHER,
    USER_LOGGED_IN,
    LOGIN_VALIDATION_SCHEMA,
  } = require("../utils/constant");
  const { Container } = require("typedi");
  const { generateAccessToken } = require("../utils/jwt");
  const BaseController = require("./base.controller");
  const { validate } = require("../utils/validate");
  
  class LoginController extends BaseController {
    constructor() {
      super();
      this.UserService = Container.get(USER_SERVICE);
      this.signIn = this.signIn.bind(this);
      this.userInfo = this.userInfo.bind(this);
      this.EventEmitter = Container.get(EVENT_DISPATCHER);
    }
  
    async signIn(request, response) {
      const { body } = request;


     const validatedData =  validate(body,LOGIN_VALIDATION_SCHEMA );
     
      const { user } = await this.UserService.login(validatedData);
      
      const token = generateAccessToken(user, true);
      
      //this.EventEmitter.emit(USER_LOGGED_IN, user);
      response.ok({ user, token });
    }

  async userInfo(request, response){
    
    const { id } = request.user;
    const user = await this.UserService.fetchUser(id);
    response.ok({ user });
  }

  }
  
  module.exports = LoginController;
  