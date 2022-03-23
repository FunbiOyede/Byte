const {
    BOOKING_SERVICE,
    EVENT_DISPATCHER,
  } = require("../utils/constant");

  const { Container } = require("typedi");
  const BaseController = require("./base.controller");
  
  class BookingController extends BaseController {
    constructor() {
      super();
      this.BookingService = Container.get(BOOKING_SERVICE);
      this.Booking = this.Booking.bind(this);
      this.GetUserBooking = this.GetUserBooking.bind(this);
      
    }
  
    async Booking(request,response){
        const { body } = request;
        const booking  = await this.BookingService.createBooking(body);
        response.ok({ booking });
    }
    async GetUserBooking(request,response){
        const { id } = request.user;
        const booking = await this.BookingService.getUserBooking(id);
        response.ok({ booking });
    }
  }
  
  module.exports = BookingController;