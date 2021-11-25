const cors = require("cors");
const express = require("express");
const expressWinston = require("express-winston")
const { EventEmitter2 } = require("eventemitter2");
const jwtAuthMiddleware = require("./middleware/auth");
const { Container } = require("typedi");
const BodyParser = require("body-parser");
const { logger } = require("./utils/logger");
const { NotFoundError, handleError } = require("./utils/error");
const StatusCodes = require("./utils/status-code");
const { httpLogger } = require("./utils/logger");
const {  EVENT_DISPATCHER,USER_LOGGED_IN,USER_REGISTERED,USER_SERVICE,REGISTER_CONTROLLER,LOGIN_CONTROLLER} = require("./utils/constant")
const asyncRequest = require("./utils/async-request");
const UserService = require("./services/user.service");
const RegisterController = require("./controllers/register.controller")
const LoginController = require("./controllers/login.controller")
class Byte {
  constructor() {
    this.app = express();
    this.configure();
  }
  /**
   * loaders
   */
  configure() {
    this.app.use(cors());
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));
    this.app.use(expressWinston.logger(httpLogger()));
    this.app.get("/status", async (req, res) => {
      res.status(200).json({ message: "Ready!, Up and running" });
    });
  }
  /**
   * @description register models
   */
  registerModels() {
    Container.set(USER_MODEL, UserSchema);
  
  }

  /**
   * @description register event-listener
   */
  registerEvents() {
    Container.set(EVENT_DISPATCHER, new EventEmitter2({ maxListeners: 10 }));
  }

  
  /**
   * @description register registration event-listener
   */
  registerRegistrationEventListeners() {
    Container.get(EVENT_DISPATCHER).on(USER_REGISTERED, async (data) => {
      //log here
      logger.info("User Registered", data);
    });
  }

  
  /**
   * @description register login event-listener
   */
  registerLoginEventListeners() {
    Container.get(EVENT_DISPATCHER).on(USER_LOGGED_IN, async (data) => {
      //log here
      logger.info("User logged in", data);
    });
  }
  getAuthRouter() {
    const router = express.Router();
    this.app.use("/auth", router);
    return router;
  }

  getGenericRouter() {
    const router = express.Router();
    this.app.use("/api", router);
    return router;
  }
  registerServices() {
    Container.set(USER_SERVICE, new UserService());
   
  }
  registerResponseHelpers() {
    this.app.use((request, response, next) => {
      Object.keys(StatusCodes).forEach((status) => {
        const statusCode = StatusCodes[status];
        response[status] = (data) =>
          response.status(statusCode).json({
            status: status,
            code: statusCode,
            data,
          });
      });
      next();
    });
  }

  registerControllers() {
    Container.set(REGISTER_CONTROLLER, new RegisterController());
    Container.set(LOGIN_CONTROLLER, new LoginController());
  }
  registerAuthRoutes() {
    const router = this.getAuthRouter();
    router.post(
      "/register",
      asyncRequest(Container.get(REGISTER_CONTROLLER).register)
    );
    router.post("/login", asyncRequest(Container.get(LOGIN_CONTROLLER).signIn));
    router.get(
      "/user",
      jwtAuthMiddleware,
      asyncRequest(Container.get(REGISTER_CONTROLLER).fetchUser)
    );
  }


  init() {
   
    this.registerEvents();
    this.registerRegistrationEventListeners();
    this.registerLoginEventListeners();
    this.registerServices();
    this.registerControllers();
    this.registerResponseHelpers();
    this.registerAuthRoutes();


    this.app.use((req, res, next) => {
      next(new NotFoundError("You seem lost, find your way back home"));
    });

    this.app.use((error, req, res, next) => {
      handleError(error, res);
    });
    return this;
  }
}

module.exports = Byte;
