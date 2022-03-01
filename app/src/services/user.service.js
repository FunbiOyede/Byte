const {USER_MODEL} = require("../utils/constant")
const { Container } = require("typedi");
const { BadRequest } = require("../utils/error");
const {comparePasswords} = require("../utils/auth");




class UserService{

    constructor(){
        this.UserModel = Container.get(USER_MODEL);
    }

    async createUser(data){

       //check exiting user
        const existingUser = await this.UserModel.forge({
            email: data.email,
          }).fetch({
            require: false,
          });
      
          if (existingUser) {
            throw new BadRequest("User Already Exits");
          }
          let user = await this.UserModel.forge(data).save();
          return user;
    }


    async login(data) {
        const user = await this.UserModel.forge({
          email: data.email,
        }).fetch({
          require: false,
        });
    
        if (!user) {
          throw new BadRequest("Could not find a user with that email.");
        }
        const password = user.attributes.password;
        if (!comparePasswords(data, password)) {
          throw new BadRequest("Invalid Credentials.");
        }
        return { user };
      }
    
      async fetchUser(id) {
        const user = await this.UserModel.forge({
          id: id,
        }).fetch({
          require: false,
        });
    
        if (!user) {
          throw new BadRequest("User not found");
        }
    
        return user;
      }
    }


module.exports = UserService;