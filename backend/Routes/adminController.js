const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');

///
const catchAsync=func=>{
  return (req,res,next)=>{
      func(req,res,next).catch(next);
  }
}


//Creating new flight
router.post('/createFlight',catchAsync(async(req,res,next)=>{
  console.log(req.body);
    const details=req.body;
    console.log(req.body);
    const flight = new Flight(details);
    await flight.save();
    res.redirect('/viewFlights');
  }))
  router.get('/viewFlights' ,(req, res) => {                                               ``
  Flight.find({})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
  });

  router.get('/updateFlight/:id' ,(req, res) => {  
    Flight.findById(req.params.id).then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
  });
  
router.delete('/delete/:id', function(req, res){
Flight.findByIdAndRemove({_id: req.params.id}, 
   function(err, docs){
if(err) res.json(err);
 
});
})


 
    router.put("/UpdateFlight/:id", (req, res) => {
      console.log("req.body", req.body);
      var _id = req.body._id;
      
      var flights =req.body;


        Flight.findByIdAndUpdate( {
          _id: req.params.id
        },flights).then(
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


module.exports=router;