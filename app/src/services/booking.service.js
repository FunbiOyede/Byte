
const {BOOKING_MODEL, HOTEL_MODEL} = require("../utils/constant")
const { Container } = require("typedi");
const { BadRequest } = require("../utils/error");


class BookingService{
    
    constructor(){
        this.BookingModel = Container.get(BOOKING_MODEL);
        this.HotelModel = Container.get(HOTEL_MODEL);
    }


   async  createBooking(data){
        let booking = await this.BookingModel.forge(data).save();
        return booking;
    }

    async getUserBooking(id){
        let booking = await this.BookingModel.forge({
            id: id,
          }).fetch({
            require: false,
          });
      //fetch hotels
     
      let hotel =  await this.HotelModel.forge({
        id: booking.attributes.hotel_id,
      }).fetch({
        require: false,
      });
          if (!hotel) {
            throw new BadRequest("booking not found");
          }

        let data = {
            booking,
            hotel
    
        }
          return data
    }

  async checkin(checkinDate){

  }

  async checkout(checkoutDate){
      
  }

}


module.exports = BookingService;