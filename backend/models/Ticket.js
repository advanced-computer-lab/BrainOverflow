const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Flight= require('./Flight');
const Seat = require('./Seat');
const User = require('./User');

const ticketSchema = new Schema({
    Name:{type:String,
    required:true},
    PaymentId:{type:String,
        required:true},
    IsChild:{type:Boolean,
        required:true},
    UserId :{type: mongoose.Schema.Types.ObjectId,required:true,
        ref:"User" },
    Flight:{FlightId: {type: mongoose.Schema.Types.ObjectId, 
               ref:"Flight" ,
               required:true
            },
             Number:{type:String,required:true}  },
      
    Departure:{Airport:{type:String,
              required:true},
              Terminal:{type:Number,
              required:true},
              Date:{type:Date,required:true},
              Time:{type:String,required:true} },
    Arrival:{Airport:{type:String,
                required:true},
                Terminal:{type:Number,
                required:true},
                Date:{type:Date,required:true},
                Time:{type:String,required:true} },
    Cabin:{ type: String,
        enum : ['Economy','Business','First'],
        
    required:true},
    Seat:{ SeatId:{type: mongoose.Schema.Types.ObjectId,
             ref:"Seat"},
           SeatNumber:{type:String } } ,
    Price:{type:Number,
    required:true}
})
const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;