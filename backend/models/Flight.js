const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Seat = require('./Seat');

const flightSchema = new Schema({
  FlightNumber : {
    type: String,
    required: true
  },
    From : {
        Airport: {type:String,
        required:true},

        Terminal: {type:Number,
        required: true}
      },
      To: {
        Airport: {type:String,
        required:true},

        Terminal: {type:Number,
        required: true}
      },
      
      Economy:{
        SeatId: [{type: mongoose.Schema.Types.ObjectId,required:true,
            ref:"Seat"}],

        Price:Number,
        Baggage:Number,
        //required:true
      },
      Business:{
        SeatId: [{type: mongoose.Schema.Types.ObjectId,required:true,
          ref:"Seat"}],
        Price:Number,
        Baggage:Number,
        //required: true
      },
      First:{
        SeatId: [{type: mongoose.Schema.Types.ObjectId,required:true,
          ref:"Seat"}],
        Price:Number,
        Baggage:Number,
       // required: true
      },
      Departure:{
        Date:{
        type: Date,
        required: true
      },
      Time:{
        type:String,
          required:true }
    },
      Arrival:{
        Date:{
          type: Date,
          required: true
        },
        Time:{type:String,
            required:true
        }
      }
    }, { timestamps: true });

      const Flight = mongoose.model('Flight', flightSchema);
      module.exports = Flight;