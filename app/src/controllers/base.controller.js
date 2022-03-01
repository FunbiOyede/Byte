class BaseController {
    successResponse(response, { user, token }) {
      return response.created({ user, token });
    }
  }
  
  module.exports = BaseController;
  