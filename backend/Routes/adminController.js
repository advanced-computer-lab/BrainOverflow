const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const { isValidObjectId } = require('mongoose');
const { time, timeStamp } = require('console');

///
const catchAsync=func=>{
  return (req,res,next)=>{
      func(req,res,next).catch(next);
  }
}
router.get('/viewFlights' ,(req, res) => {                                               ``
    Flight.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    });

//Creating new flight
router.post('/createFlight',catchAsync(async(req,res,next)=>{
    const details=req.body;
    console.log(req.body);
    const flight = new Flight(details);
    await flight.save();
  
    res.send();
  }))
  router.get("/getflights",async(req,res)=>{
    Flight.find().then(result=>
    res.send(result));
  });

 //search 
 
 /*router.post('/search',async(req,res,next)=>{
  const searchItem='^'+req.body;
  await Flight.find(
   { $or: [{ ID:ObjectId(searchItem) }, { Departure: timeStamp(searchItem)}, { Arrival:searchItem},{FlightDate:Date(searchItem)},{Terminal:searchItem}] },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(JSON.stringify(result, null, 4));
          
      }
     } )

})*/

 


router.get('/flight/:id/delete', function(req, res){
user.findByIdAndRemove({_id: req.params.id}, 
   function(err, docs){
if(err) res.json(err);
else    res.redirect('/view');
});
})


module.exports=router;