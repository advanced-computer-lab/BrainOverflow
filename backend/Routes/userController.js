const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const Seat =require('../models/Seat')
const Ticket =require('../models/Ticket')
const nodemailer = require("nodemailer");


const catchAsync=func=>{
  return (req,res,next)=>{
      func(req,res,next).catch(next);
  }
}
 


   router.put("/updateReserved/:id", (req, res) => {
    let theSeat= req.body.SeatId;
    let tickets= req.body.Ticket;
    
    console.log(theSeat);
     tickets.forEach((f) =>{console.log(f)})

    User.findByIdAndUpdate( {
        _id: req.params.id
      },{TicketsId:tickets}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
    });
      Seat.findByIdAndUpdate({_id:theSeat},{IsBooked:false}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Seat : ", docs);
        }
    });
    tickets.forEach((f) =>{
    Ticket.findByIdAndDelete({_id:f} , function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Seat : ", docs);


      }
  });

})

    });

  router.get('/viewFlights' ,catchAsync(async (req, res,next) => {  
      const f = await Flight.find({}).populate(['First.SeatId','Business.SeatId','Economy.SeatId']);
      res.send(f);
      }))
   router.get('/viewFlight/:id' ,async (req, res)=> {   
        const f = await Flight.find({}).populate(['First.SeatId','Business.SeatId','Economy.SeatId']);
                                                  
       await Flight.findById(req.params.id).then(result => {
           
          res.send({aFlight: result, allFlight: f});
        })
        .catch(err => {
          console.log(err);
        });
      });
    

///
 
router.get('/updateProfile/:id', (req, res) => {
  const user = User.findById(req.params.id);
  User.findById(req.params.id).then(result => {
     
    res.send(result);
  })
    .catch(err => {
      console.log(err);
    });
});
router.put("/updateProfile/:id", (req, res) => {
   
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
        error: error
      });
    }
  );

}); 

router.get('/viewReserved/:id', catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("TicketsId");
  res.send(user);
  })); 
     
 
router.get('/:id', catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("TicketsId");
  res.send(user);
}));

module.exports = router;
