const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const flightSchema = new Schema({
  FlightNumber : {
    type: String,
    required: true,
  },
    From : {
        airport:{type :String,required:true} ,
        terminal:{ type:Number,
        required: true}
      },
      To:{
        airport:{type :String,required:true} ,
        terminal:{ type:Number,
        required: true}
      },
      FlightDate:{
        type: Date,
        required:true
      },
      Economy:{
        seats: {type:Number,required:true},
        price:{type:Number,required:true},
        baggage:{type:Number,required:true},
      },
      Business:{
        seats: {type:Number,required:true},
        price:{type:Number,required:true},
        baggage:{type:Number,required:true},
      },
      First:{
        seats: {type:Number,required:true},
        price:{type:Number,required:true},
        baggage:{type:Number,required:true},
      },
      Departure:{
        type: String,
        required: true
      },
      Arrival:{
        type: String,
        required: true
      }
    }, { timestamps: true });

      const Flight = mongoose.model('Flight', flightSchema);
      module.exports = Flight;