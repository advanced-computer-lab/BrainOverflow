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
    if(theSeat!==null){
      Seat.findByIdAndUpdate({_id: theSeat},{IsBooked:false}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Seat : ", docs);
        }
    });
  }
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
        const f = await Flight.find({}).populate(['First.SeatId','Business.SeatId','Economy.SeatId']);
                                                  
       await Flight.findById(req.params.id).then(result => {
           
          res.send({aFlight: result, allFlight: f});
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

router.get('/viewReserved/:id', catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("TicketsId");
  res.send(user);
  })); 
     
 
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
 
router.post('/confirmReserve/:id', catchAsync(async (req, res, next) => {
  const details = req.body;
  console.log(details);
  const user = await User.findById(req.params.id);
 console.log(user);
 
  const goingflight=await Flight.findById(details.DepartureId) 
    .catch(err => {
      res.send(err);
    }); 
    
   const returnflight =await Flight.findById(details.ReturnFlightId).catch(err => {
      res.send(err);
    });
 
  
  for (i = 0; i < parseInt(details.Children); i++) {
    const ticketgoing = new Ticket( {'Name':details.Names[i] ,'UserId':req.params.id , 
    'Flight':{'FlightId':details.DepartureId  ,'Number':goingflight.FlightNumber},'Departure':
    {'Airport':goingflight.From.Airport ,'Terminal':goingflight.From.Terminal ,'Date':goingflight.Departure.Date ,'Time':goingflight.Departure.Time},
      'Arrival':{'Airport':goingflight.To.Airport,'Terminal':goingflight.To.Terminal,'Date':goingflight.Arrival.Date ,'Time':goingflight.Arrival.Time }
      ,'Cabin':details.Cabin,'Price':details.DeparturePriceChild,'Seat':{'SeatId':null,'SeatNumber':''}});
      
      const ticketreturn = new Ticket( {'Name':details.Names[i] ,'UserId':req.params.id , 
      'Flight':{'FlightId':details.ReturnFlightId  ,'Number':returnflight.FlightNumber},'Departure':
      {'Airport':returnflight.From.Airport ,'Terminal':returnflight.From.Terminal ,'Date':returnflight.Departure.Date ,'Time':returnflight.Departure.Time},
        'Arrival':{'Airport':returnflight.To.Airport,'Terminal':returnflight.To.Terminal,'Date':returnflight.Arrival.Date ,'Time':returnflight.Arrival.Time }
        ,'Cabin':details.Cabin,'Price':details.ReturnPriceChild,'Seat':{'SeatId':null,'SeatNumber':''}});
    user.TicketsId.push(ticketgoing._id);
    user.TicketsId.push(ticketreturn._id);
    await user.save();
    await ticketgoing.save();
    await ticketreturn.save();
  }
  for (i = 0; i < parseInt(details.Adults); i++) {
    const ticketgoing = new Ticket( {'Name':details.Names[i] ,'UserId':req.params.id , 
    'Flight':{'FlightId':details.DepartureId  ,'Number':goingflight.FlightNumber},'Departure':
    {'Airport':goingflight.From.Airport ,'Terminal':goingflight.From.Terminal ,'Date':goingflight.Departure.Date ,'Time':goingflight.Departure.Time},
      'Arrival':{'Airport':goingflight.To.Airport,'Terminal':goingflight.To.Terminal,'Date':goingflight.Arrival.Date ,'Time':goingflight.Arrival.Time }
      ,'Cabin':details.Cabin,'Price':details.DeparturePriceAdult,'Seat':{'SeatId':null,'SeatNumber':''}});
      const ticketreturn = new Ticket( {'Name':details.Names[i] ,'UserId':req.params.id , 
      'Flight':{'FlightId':details.ReturnFlightId  ,'Number':returnflight.FlightNumber},'Departure':
      {'Airport':returnflight.From.Airport ,'Terminal':returnflight.From.Terminal ,'Date':returnflight.Departure.Date ,'Time':returnflight.Departure.Time},
        'Arrival':{'Airport':returnflight.To.Airport,'Terminal':returnflight.To.Terminal,'Date':returnflight.Arrival.Date ,'Time':returnflight.Arrival.Time }
        ,'Cabin':details.Cabin,'Price':details.ReturnPriceAdult,'Seat':{'SeatId':null,'SeatNumber':''}});
    user.TicketsId.push(ticketgoing);
    user.TicketsId.push(ticketreturn);
    await user.save();
    await ticketgoing.save();
    await ticketreturn.save();
  }
  
}));
module.exports = router;