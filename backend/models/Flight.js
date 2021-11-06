const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const flightSchema = new Schema({
    From : {
        type: String,
        required: true,
      },
      To:{
        type: String,
        required: true,
      },
      FlightDate:{
        type: Date,
        required:true,
      },
      Economy:{
        type: Number,
        required:true,
      },
      Business:{
        type: Number,
        required: true,
      },
      First:{
        type: Number,
        required: true
      },
      Terminal:{
        type: String,
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