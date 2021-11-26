const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const flightSchema = new Schema({
  FlightNumber : {
    type: String,
    required: true,
  },
    From : {
        airport: String,
        terminal: Number,
        required: true,
      },
      To:{
        type: String,
        terminal: Number,
        required: true,
      },
      FlightDate:{
        type: Date,
        required:true,
      },
      Economy:{
        seats: Number,
        price:Number,
        baggage:Number,
        required:true,
      },
      Business:{
        seats: Number,
        price:Number,
        baggage:Number,
        required: true,
      },
      First:{
        seats: Number,
        price:Number,
        baggage:Number,
        required: true
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