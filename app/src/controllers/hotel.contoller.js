const {
    HOTEL_SERVICE,
    EVENT_DISPATCHER,
  } = require("../utils/constant");
  const { Container } = require("typedi");
  const BaseController = require("./base.controller");
  
  class HotelController extends BaseController {
    constructor() {
      super();
      this.HotelService = Container.get(HOTEL_SERVICE);
      this.addHotel = this.addHotel.bind(this);
      this.allHotels = this.allHotels.bind(this);
      this.fetchHotel = this.fetchHotel.bind(this);
      this.addRoomType = this.addRoomType.bind(this);
    }
  
    async addHotel(request, response) {
      const { body } = request;
      const hotel  = await this.HotelService.AddHotel(body);
      response.ok({ hotel });
      
    }

    //changing this to lists of hotels nearby to user locations

    async allHotels(request, response) {
      const hotel  = await this.HotelService.GetAllHotels();
      response.ok({ hotel });
      
    }

    async fetchHotel(request,response){
      const id = request.params.id
      const hotel = await this.HotelService.fetchHotelById(id);
      response.ok({ hotel });
    }


    ///there are different room types that can be in an hotel
    //     Ocean view
    // Non-smoking rooms
    // Suites
    // Family rooms
    // Smoking rooms available


    async addRoomType(request,response){
      const { body } = request;
      const roomType = await this.HotelService.addRoomType(body);
      response.ok({ roomType });
    }
  }
  
  module.exports = HotelController;
  