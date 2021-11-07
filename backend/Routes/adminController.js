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
    const details=req.body;
    console.log(req.body);
    const flight = new Flight(details);
    await flight.save();
<<<<<<< Updated upstream
  
    res.send();
=======
    
    //res.redirect('/viewFlights');
>>>>>>> Stashed changes
  }))
  router.get("/getflights",async(req,res)=>{
    Flight.find().then(result=>
    res.send(result));
  });

 //search 
 /*
 router.get('/search',async(req,res,next)=>{
  await Flight.find(
      { $or: [{ ID: }, { Departure: }, { Arrival:},{FlightDate:},{Terminal:}] },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );

})
*/
router.get('/flight/:id/delete', function(req, res){
user.findByIdAndRemove({_id: req.params.id}, 
   function(err, docs){
if(err) res.json(err);
else    res.redirect('/view');
});
})


module.exports=router;