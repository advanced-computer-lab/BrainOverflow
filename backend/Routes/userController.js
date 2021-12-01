const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
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

<<<<<<< Updated upstream
  router.get('/viewFlights' ,(req, res) => {                                               
  Flight.find({}) 
    .then(result => {
      res.send(result);
=======
 
    router.get('/viewFlights' ,catchAsync(async (req, res,next) => {  
      const f = await Flight.find({}).populate(['First.SeatId','Business.SeatId','Economy.SeatId']);
      const seats = f.Seat;
      res.send(f);
      }))

  router.get('/viewFlight/:id' ,async (req, res)=> {   
    const f = await Flight.find({});
                                              
   await Flight.findById(req.params.id).then(result => {
       
      res.send({aFlight: result, allFlight: f});
>>>>>>> Stashed changes
    })
    .catch(err => {
      console.log(err);
    });
  });
<<<<<<< Updated upstream
=======
    
>>>>>>> Stashed changes
module.exports=router;
     
