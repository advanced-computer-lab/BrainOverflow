const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
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
module.exports=router;
     

///
const catchAsync = func => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  }
}
router.get('/updateProfile/:id', (req, res) => {
  const user = User.findById(req.params.id);
  User.findById(req.params.id).then(result => {
    console.log(user)
    res.send(result);
  })
    .catch(err => {
      console.log(err);
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
        error: error
      });
    }
  );

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

module.exports = router;
