const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const Seat =require('../models/Seat');
const Ticket =require('../models/Ticket');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sky.overflow.flight@gmail.com',
    pass: '1_2_3_4_5'

  } 
 
});

const catchAsync=func=>{
  return (req,res,next)=>{
      func(req,res,next).catch(next);
  }
}
 
 

   router.put("/updateReserved/:id", (req, res) => {
    let theSeat= req.body.SeatId;
    let tickets= req.body.Ticket;
    let theTicket= req.body.theTicket;
    let theEmail= req.body.Email;
    let Price=req.body.Price;
    let Name= req.body.TicketName;
    let userName= req.body.UserName;
    console.log(theSeat);
     tickets.forEach((f) =>{console.log(f)});
   
    
console.log(theEmail);
   var mailOptions = {
      from: 'sky.overflow.flight@gmail.com' ,
      to: theEmail,
      subject: 'Reservation Cancelled!!',
      text: 
      `Dear ${userName}, 
      you have cancelled Ticket no: ${theTicket} of passenger ${Name} and the amount refunded is ${Price} LE`
    }; 
    

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
      Seat.findByIdAndUpdate({_id: theSeat},{IsBooked:false}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Seat : ", docs);
        }
    });
    
    Ticket.findByIdAndDelete({_id:theTicket} , function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Tickets : ", docs);
      }
  });

 transporter.sendMail( mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})  

    router.get('/viewFlights' ,catchAsync(async (req, res,next) => {  
      const f = await Flight.find({}).populate(['First.SeatId','Business.SeatId','Economy.SeatId']);
      res.send(f);
      }))
      router.get('/viewFlight/:id' ,async (req, res)=> {   
        const f = await Flight.find({});
                                                  
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
  const user = await User.findById(req.params.id).populate("Tickets.Id");
  res.send(user);
}));

module.exports = router;
