const {HOTEL_MODEL,ROOM_TYPE_MODEL,ROOM_INVENTORY_MODEL} = require("../utils/constant")
const { Container } = require("typedi");
const { BadRequest } = require("../utils/error");





class HotelService{

    constructor(){
        this.HotelModel = Container.get(HOTEL_MODEL);
        this.RoomTypeModel = Container.get(ROOM_TYPE_MODEL)
        this.RoomInventory = Container.get(ROOM_INVENTORY_MODEL);
    }

    async AddHotel(data){

       //check exiting user
        const existingHotel = await this.HotelModel.forge({
            name: data.name,
          }).fetch({
            require: false,
          });
      
          if (existingHotel) {
            throw new BadRequest("Hotel already exists on the systems");
          }
          let hotel = await this.HotelModel.forge(data).save();
          return hotel;
    }

    
      async GetAllHotels(){
        const hotels = await this.HotelModel.fetchAll();
        return hotels

      }



      async fetchHotelById(id){
        const hotel = await this.HotelModel.forge({
          id: id,
        }).fetch({
          require: false,
        });
    
        if (!hotel) {
          throw new BadRequest("Hotel not found");
        }
    
        return hotel;
      }


      async addRoomType(data){
          
      let roomType = await this.RoomTypeModel.forge(data).save();
          return roomType;
      }


      async roomInventory(data){
        let roomsAvailabilityInfo = await this.RoomInventory.forge(data).save();
        return roomsAvailabilityInfo;
        
      }
  }
  


module.exports = HotelService;