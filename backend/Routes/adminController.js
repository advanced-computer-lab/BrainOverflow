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
Flight.findByIdAndRemove({_id: req.params.id}, 
   function(err, docs){
if(err) res.json(err);
else    res.redirect('/view');
});
})


/*router.put('/UpdateFlight/:id',(req , res)=>{
  var id=req.params.id;
      console.log(req.params);
       Flight.findOne({_id:id}).then((result)=>{
           if(req.body.id)
           {
               result.From=req.body.From;
           }
           result.save().then((result)=>
           {
               res.send("update is done");
          }).catch((err)=>
           {
               console.log(err);
           })
       });
    });*/

/* {
        From: req.body.From,
        To: req.body.To,
        FlightDate: req.body.FlightDate,
        Economy: req.body.Economy,
        Business: req.body.Business,
        First: req.body.First ,
        Departure: req.body.Departure ,
        Arrival: req.body.Arrival,
        Terminal: req.body.Terminal ,}*/
    router.put("/UpdateFlight/:id", (req, res) => {
      console.log("req.body", req.body);
      // inserting a new inventory
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
  
  

      


/*userRouter.put('/newupdate/:id',(req,res)=>
// {
//     var id=req.params.id;
//     console.log(req.params);
//     User.findByIdAndUpdate({_id:id},req.body).then((result)=>{
//         res.send("DONE");
//     });
// });

try{
    const flight = await Flight.findById(req.params.id);
    Object.assign(flight , req.body);
    flight.save();
    res.send({data : flight});
  } catch {
    res.status(404).send({error : "flight not found"});
  }

*/

/*first way to update data in a collection
// userRouter.put('/update/:id',(req,res)=>
// {
//     var id=req.params.id;
//     console.log(req.params);
//     User.findOne({_id:id}).then((result)=>{
//         if(req.body.name)
//         {
//             result.name=req.body.name;
//         }
//         result.save().then((result)=>
//         {
//             res.send("update is done");
//         }).catch((err)=>
//         {
//             console.log(err);
//         })
//     });
// });*/

module.exports=router;