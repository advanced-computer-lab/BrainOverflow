const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const Seat = require('../models/Seat');
const Ticket = require('../models/Ticket');
const catchAsync=func=>{
  return (req,res,next)=>{
      func(req,res,next).catch(next);
  }
}
 
// router.get('/viewReserved/:id',catchAsync(async(req,res,next)=>{
//   var ObjectId = require('mongoose').Types.ObjectId;
//   if ( ObjectId.isValid(req.params.id)) {
//     const user =await User.findById(req.params.id).populate("Tickets.Id");
//  res.send(user);
//   }
//   else{
//     console.log(req.params);
//   }
  

//    }))

   router.put("/updateReserved/:id", (req, res) => {
    console.log("req.body", req.body);
  
    
    var flights =req.body;
     User.findByIdAndUpdate( {
        _id: req.params.id
      },{Tickets:flights}).then(
        () => {
           res.status(201).json({
              message: 'Thing updated successfully!'
           });
        }
      ).catch(
        (error) => {
           res.status(400).json({
              error: error
           });
        }
      );
    });

  router.get('/viewFlights' ,(req, res) => {                                               
  Flight.find({}) 
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
  });
  router.get('/viewFlight/:id' ,async (req, res)=> {                                               
   await Flight.findById(req.params.id).then(result => {
      console.log(result);
      res.send(result);
      
    })
    .catch(err => {
      console.log(err);
    });
  });
    
 
router.get('/updateProfile/:id', (req, res) => {
  User.findById(req.params.id).then(result => {
    res.send(result);
  })
    .catch(err => {
      res.send(err);
    });
});
router.put("/updateProfile/:id", (req, res) => {
  console.log("req.body", req.body);
  var _id = req.body._id;
  var user = req.body;
  User.findByIdAndUpdate({
    _id: req.params.id
  }, user).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        message: error
      });
    }
  );

});
 
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(result => {
    res.send(result);
  })
    .catch(err => {
      console.log(err);
     res.send(err);
    });
});
router.get('/reservedFlights/:id', catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("Tickets.Id");
  const tickets = user.Tickets;
  res.send(user);
}))
router.get('/:id', catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("Tickets.Id");
  res.send(user);
}));
router.get('/viewSeats/:FlightId/:Cabin/:TicketId',catchAsync(async(req,res,next)=>{
  console.log("I CAME HEREEE")
  const FlightId = req.params.FlightId;
  const cabin = req.params.Cabin;
 const availableSeats= await Seat.find({'FlightId':FlightId,'Cabin':cabin,'IsBooked':false});
 res.send(availableSeats);
}));
router.post('/viewSeats/:SeatId/:TicketId',catchAsync(async(req,res,next)=>{
  console.log('beginning')
  const seat =await Seat.findById(req.params.SeatId);
  console.log(seat);
  const ticket =await Ticket.findById(req.params.UserId);
  console.log(ticket)
  if(ticket.Flight.FlightId!=seat.FlightId)
  {console.log('Cant book');
  res.send('error')

}
  seat.IsBooked=true;
  ticket.Seat.SeatId=seat._id;
  ticket.Seat.SeatNumber=seat.SeatNumber;
  await ticket.save();
  await seat.save();
  console.log('end')
}));

module.exports = router;
