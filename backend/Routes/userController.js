const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const Seat =require('../models/Seat');

const catchAsync=func=>{
  return (req,res,next)=>{
      func(req,res,next).catch(next);
  }
}
 
router.get('/viewReserved/:id',catchAsync(async(req,res,next)=>{
  var ObjectId = require('mongoose').Types.ObjectId;
  if ( ObjectId.isValid(req.params.id)) {
    const user =await User.findById(req.params.id).populate("Tickets.Id");
 res.send(user);
  }
  else{
    console.log(req.params);
  }
  

   }))

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

 
router.get('/viewFlights' ,catchAsync(async (req, res,next) => {  
      const f = await Flight.find({}).populate(['First.SeatId','Business.SeatId','Economy.SeatId']);
      res.send(f);
      }))

      router.get('/viewSeats' ,catchAsync(async (req, res,next) => {  
        const f = await Seat.find({});
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
    
module.exports=router;
     
