
const {BOOKING_MODEL, HOTEL_MODEL, ROOM_INVENTORY_MODEL} = require("../utils/constant")
const { Container } = require("typedi");
const { BadRequest,RoomNotAvailable } = require("../utils/error");
const knex = require("../data/knex/knex");
const bookshelf = require("bookshelf")(knex);


class BookingService{
    
    constructor(){
        this.BookingModel = Container.get(BOOKING_MODEL);
        this.HotelModel = Container.get(HOTEL_MODEL);
        this.RoomInventory = Container.get(ROOM_INVENTORY_MODEL)
    }


   async  createBooking(data){
     //

     return new Promise(async (resolve, reject) => {

      bookshelf.transaction(async(t) =>{
        //check booking 
        const existingBooking = await this.BookingModel.forge({
          hotel_id: data.hotel_id,
        }).fetch({
          require: false,
        });
    
        if (existingBooking) {
          //throw new BadRequest("booking Already Exits");
          reject("booking Already Exits");
        }
       
          let booking = await this.BookingModel.forge(data).save(null, { transacting: t });
         
          resolve({booking})
       })
       

     })
    
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



  ///check forr rroom availability
}


module.exports = BookingService;