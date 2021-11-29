const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Flight= require('./Flight');
const Seat = require('./Seat');
const User = require('./User');

const ticketSchema = new Schema({
    UserId :{type: mongoose.Schema.Types.ObjectId,required:true,
        ref:"User" },
    FlightId:{type: mongoose.Schema.Types.ObjectId,required:true,
        ref:"Flight"},
    Age:{ type: String,
        enum : ['Child','Adult'],
        default: 'Adult' ,
    required:true},
    SeatId:{ type: mongoose.Schema.Types.ObjectId,required:true,
             ref:"Seat"} ,
    Price:{type:Number,
    required:true}
})
const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;