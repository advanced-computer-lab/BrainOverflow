const mongoose = require('mongoose');
const { string } = require('prop-types');
const Schema = mongoose.Schema;
const Flight= require('./Flight');
const seatSchema = new Schema({
    SeatNumber:{
        type:String,
        required:true,
    },
    FlightId:{type: mongoose.Schema.Types.ObjectId,required:true,
        ref:"Flight"},
    Cabin:{type:String,required:true},
    IsBooked:{
        type:Boolean,
        required:true
    }
    
})
const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;