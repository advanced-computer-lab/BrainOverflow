const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const Seat = require('../models/Seat');
const Ticket = require('../models/Ticket');
const nodemailer = require('nodemailer');
const auth = require ('../middleware/auth');

const cors = require("cors")


router.use(bodyParser.json())
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51K8UnBGmD9zb7igMlNQnyWl8REycCu9x2zgLsIcLodnv2rTucM4NUalCuSztqQsL3fMUjIAoUxH35BM1VSlf246E00oaWXnrh3');


router.use(bodyParser.urlencoded({ extended: true }))
router.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body;
  
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sky.overflow.flight@gmail.com',
    pass: '1_2_3_4_5'

  }

});

const catchAsync = func => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  }
}
 


   router.put("/updateReserved",auth ,(req, res) => {
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
        _id: req.user
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
      else {
        console.log("Updated Seat : ", docs);
      }
    });
  
  

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

router.get('/viewFlights', catchAsync(async (req, res, next) => {
  console.log(req.body, req.params);
  const f = await Flight.find({}).populate(['First.SeatId', 'Business.SeatId', 'Economy.SeatId']);
  res.send(f);
}))
router.get('/viewFlight/:id', async (req, res) => {
  const f = await Flight.find({}).populate(['First.SeatId', 'Business.SeatId', 'Economy.SeatId']);

  await Flight.findById(req.params.id).then(result => {

    res.send({ aFlight: result, allFlight: f });
  })
    .catch(err => {
      console.log(err);
    });
});


  // router.get('/viewFlights' ,catchAsync(async (req, res,next) => {  
  //   console.log(req.body,req.params);
  //     const f = await Flight.find({}).populate(['First.SeatId','Business.SeatId','Economy.SeatId']);
  //     res.send(f);
  //     }))


      
 
                                                  
  //      await Flight.findById(req.params.id).then(result => {
           
  //         res.send({aFlight: result, allFlight: f});
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //     });

      

router.get('/updateProfile',auth ,(req, res) => {
  User.findById(req.user).then(result => {
    res.send(result);
  })
    .catch(err => {
      res.send(err);
    });
});
router.put("/updateProfile",auth ,(req, res) => {
   
  var _id = req.body._id;
  var user = req.body;
  User.findByIdAndUpdate({
    _id: req.user
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

router.get('/viewReserved',auth ,catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user).populate("TicketsId");
  res.send(user);
  })); 
     
 
router.get('/userProfile',auth ,catchAsync(async (req, res, next) => {
  console.log(req.params.id)
const  user = await User.findById(req.user);
  console.log(user);
  if(user==''){  res.status(404).send({
    message: 'User not found!'
 });}
  res.send(user);
}));

router.get('/viewSeats/:FlightId/:Cabin/:TicketId',auth,catchAsync(async(req,res,next)=>{
  //console.log("I CAME HEREEE")
  const cabin = req.params.Cabin;
  const departure = req.params.DepartureAirport;
  //const departureDate = req.params.DepartureDate;
  //const arrivalAirport = req.params.ArrivalAirport;
  //const returndate = req.params.Returndate;
  const adults = req.params.Adults;
  const kids = req.params.Kids;


  if (cabin=='First'){
    const availableFlights= await Flight.find({'First.SeatsLeft':{$gt:adults+kids},'From.Airport':departure});
  }
  else if(cabin=='Bussiness'){
    const availableFlights= await Flight.find({'Business.SeatsLeft':{$gt:adults+kids},'From.Airport':departure});

  }else if(Economy){
    const availableFlights= await Flight.find({'Economy.SeatsLeft':{$gt:adults+kids},'From.Airport':departure});
  }
 console.log("available seats in get req",availableFlights);

 if(availableFlights.length==0){ 
   console.log("error in get entered")
    res.status(404).send({
  message: 'No availabe flights'
});}
 res.send(availableFlights);
}));

router.get('/viewSeats/:id/:FlightId/:Cabin/:TicketId',catchAsync(async(req,res,next)=>{
  const FlightId = req.params.FlightId;
  const cabin = req.params.Cabin;
  const availableSeats = await Seat.find({ 'FlightId': FlightId, 'Cabin': cabin, 'IsBooked': false });
  console.log("FlightId in get", FlightId, cabin);
  console.log("available seats in get req", availableSeats);
  if (availableSeats.length == 0) {
    console.log("error in get entered")
    res.status(404).send({
      message: 'No availabe seats'
    });
  }
  res.send(availableSeats);
}));


router.get('/changeSeats/:id/:FlightId/:Cabin/:TicketId/:OldSeat',catchAsync(async(req,res,next)=>{
  const FlightId = req.params.FlightId;
  const cabin = req.params.Cabin;
 const availableSeats= await Seat.find({'FlightId':FlightId,'Cabin':cabin,'IsBooked':false});
 console.log("FlightId in get",FlightId,cabin);
 console.log("available seats in get req",availableSeats);
 if(availableSeats.length==0){ 
   console.log("error in get entered")
    res.status(404).send({
  message: 'No availabe seats'
});}
 res.send(availableSeats);
}));
router.post('/viewSeats/:SeatId/:TicketId',auth,catchAsync(async(req,res,next)=>{
  console.log('beginning')
  const user=await User.findById(req.user);
  const seat =await Seat.findById(req.params.SeatId);
  const oldSeat =await Seat.findById(req.params.OldSeat);
  console.log(seat);
  const ticket =await Ticket.findById(req.params.TicketId);
 
//   if(ticket.Flight.FlightId!=seat.FlightId)
//   {console.log("ticket flight error in post",ticket.Flight.FlightId);
//     console.log("seat flight error in post",seat.FlightId)
//     console.log('Cant book');
//   res.send('error')
// }
  seat.IsBooked=true;
  oldSeat.IsBooked=false;
  ticket.Seat.SeatId=seat._id;
  ticket.Seat.SeatNumber=seat.SeatNumber;
  await ticket.save();
  await seat.save();
  await user.save();
  console.log('end')

}));



// Cabin: '',
// Adults: 0,
// Children: 0,
// ReturnDate: ''
router.post('searchFlights', catchAsync(async (req, res, next) => {
  const searchObject = req.body;
  const From = { 'Airport': searchObject.FromAirport, 'Terminal': details.FromTerminal };
  const To = { 'Airport': details.ToAirport, 'Terminal': details.ToTerminal };
  const Economy = { 'SeatId': [], 'Price': details.EconomyPrice, 'ChildPrice': details.EconomyChildPrice, 'Baggage': details.EconomyBaggage };
  const Business = { 'SeatId': [], 'Price': details.BusinessPrice, 'ChildPrice': details.BusinessChildPrice, 'Baggage': details.BusinessBaggage };
  const First = { 'SeatId': [], 'Price': details.FirstPrice, 'ChildPrice': details.FirstChildPrice, 'Baggage': details.FirstBaggage };
  const Departure = { 'Date': details.DepartureDate, 'Time': details.DepartureTime };
  const Arrival = { 'Date': details.ArrivalDate, 'Time': details.ArrivalTime };
  const flight = new Flight({ FlightNumber: details.FlightNumber, From: From, To: To, Economy: Economy, Business: Business, First: First, Departure: Departure, Arrival: Arrival });
 }))
 
router.post('/confirmReserved',auth ,catchAsync(async (req, res, next) => {
  const details = req.body;
  console.log(details);
  const user = await User.findById(req.user);
 console.log(user);
 
  const goingflight=await Flight.findById(details.DepartureId) 
    .catch(err => {

      res.send(err);
    });
  const returnflight = await Flight.findById(details.ReturnFlightId).catch(err => {
    res.send(err);
  });


  for (i = 0; i < parseInt(details.Children); i++) {
    const ticketgoing = new Ticket( {'Name':details.ChildrenNames[i] ,'UserId':req.user , 
    'Flight':{'FlightId':details.DepartureId  ,'Number':goingflight.FlightNumber},'Departure':
    {'Airport':goingflight.From.Airport ,'Terminal':goingflight.From.Terminal ,'Date':goingflight.Departure.Date ,'Time':goingflight.Departure.Time},
      'Arrival':{'Airport':goingflight.To.Airport,'Terminal':goingflight.To.Terminal,'Date':goingflight.Arrival.Date ,'Time':goingflight.Arrival.Time }
      ,'Cabin':details.Cabin,'Price':details.DeparturePriceChild,'Seat':{'SeatId':null,'SeatNumber':'',IsChild:'true'}});
      
      const ticketreturn = new Ticket( {'Name':details.ChildrenNames[i] ,'UserId':req.user , 
      'Flight':{'FlightId':details.ReturnFlightId  ,'Number':returnflight.FlightNumber},'Departure':
      {'Airport':returnflight.From.Airport ,'Terminal':returnflight.From.Terminal ,'Date':returnflight.Departure.Date ,'Time':returnflight.Departure.Time},
        'Arrival':{'Airport':returnflight.To.Airport,'Terminal':returnflight.To.Terminal,'Date':returnflight.Arrival.Date ,'Time':returnflight.Arrival.Time }
        ,'Cabin':details.Cabin,'Price':details.ReturnPriceChild,'Seat':{'SeatId':null,'SeatNumber':'',IsChild:'true'}});
    user.TicketsId.push(ticketgoing._id);
    user.TicketsId.push(ticketreturn._id);
    (details.Cabin == 'Economy') ? goingflight.Economy.SeatsLeft-- : (details.Cabin == 'First') ? goingflight.First.SeatsLeft-- : goingflight.Business.SeatsLeft--;
    await user.save();
    await ticketgoing.save();
    await ticketreturn.save();
  }
  for (i = 0; i < parseInt(details.Adults); i++) {
    const ticketgoing = new Ticket( {'Name':details.AdultNames[i] ,'UserId':req.params.id , 
    'Flight':{'FlightId':details.DepartureId  ,'Number':goingflight.FlightNumber},'Departure':
    {'Airport':goingflight.From.Airport ,'Terminal':goingflight.From.Terminal ,'Date':goingflight.Departure.Date ,'Time':goingflight.Departure.Time},
      'Arrival':{'Airport':goingflight.To.Airport,'Terminal':goingflight.To.Terminal,'Date':goingflight.Arrival.Date ,'Time':goingflight.Arrival.Time }
      ,'Cabin':details.Cabin,'Price':details.DeparturePriceAdult,'Seat':{'SeatId':null,'SeatNumber':'',IsChild:'false'}});
      const ticketreturn = new Ticket( {'Name':details.AdultNames[i] ,'UserId':req.params.id , 
      'Flight':{'FlightId':details.ReturnFlightId  ,'Number':returnflight.FlightNumber},'Departure':
      {'Airport':returnflight.From.Airport ,'Terminal':returnflight.From.Terminal ,'Date':returnflight.Departure.Date ,'Time':returnflight.Departure.Time},
        'Arrival':{'Airport':returnflight.To.Airport,'Terminal':returnflight.To.Terminal,'Date':returnflight.Arrival.Date ,'Time':returnflight.Arrival.Time }
        ,'Cabin':details.Cabin,'Price':details.ReturnPriceAdult,'Seat':{'SeatId':null,'SeatNumber':'',IsChild:'false'}});
        (details.Cabin=='Economy')?goingflight.Economy.SeatsLeft--:(details.Cabin=='First')?goingflight.First.SeatsLeft--:goingflight.Business.SeatsLeft--;
    user.TicketsId.push(ticketgoing);
    user.TicketsId.push(ticketreturn);
    await user.save();
    await ticketgoing.save();
    await ticketreturn.save();
  }

}));
router.post('/SearchFlight', catchAsync(async (req, res, next) => {
  const details = req.body;
  console.log(details.ReturnDate);
  const retFrom = details.From;
  const retTo = details.To;
  const Cabin = details.cabin;
  const Adults = details.Adults;
  const Children = details.Children;
  const ReturnDate = details.ReturnDate;

  await Flight.find({ 'From.Airport': 'alex' })
    .then(result => {
      res.send(result);
      console.log("res : ", result);
    })
    .catch(err => {
      console.log(err);
    });

}));


router.post('/SearchFlight', catchAsync(async (req, res, next) => {
  const details = req.body;
  console.log(details.ReturnDate);
  const retFrom=details.From;
  const retTo =details.To;
  const Cabin=details.cabin;
  const Adults=details.Adults;
  const Children=details.Children;
  const ReturnDate=details.ReturnDate;

  await Flight.find({'From.Airport' :'alex'})
  .then(result => {
    res.send(result);
    console.log("res : ",result);
  })
  .catch(err => {
    console.log(err);
  });

 }));
router.get('/changeFlight/:id/:TicketId',async(req,res,next)=>{
      console.log("ANA GEET HENA");
  try{
    const ticket = await Ticket.findById(req.params.TicketId);
 // const user = await User.findById(req.params.id);
 const Cabin = ticket.Cabin;

 var flights=null;
if(Cabin =="Economy"){
  console.log('d5lt economy')
   flights = await Flight.find({'From.Airport':ticket.Departure.Airport,'To.Airport':ticket.Arrival.Airport,'Economy.SeatsLeft':{$gt:0}});
}else if(Cabin =="First"){
 flights = await Flight.find({'From.Airport':ticket.Departure.Airport,'To.Airport':ticket.Arrival.Airport,'First.SeatsLeft':{$gt:0}});
}else 
 flights = await Flight.find({'From.Airport':ticket.Departure.Airport,'To.Airport':ticket.Arrival.Airport,'Business.SeatsLeft':{$gt:0}});
  if(flights.length==0) { res.status(400).json({
    message: "No flights available with similar criteria"
  })}
  else{
    res.send({flights:flights,ticket:ticket});
  }
  }
  catch{
    (error) => {
      res.status(400).json({
        message: "No flights available with similar criteria"
      })};
}
})
router.put('/changeFlight/:id/:TicketId/:ChosenFlightId',async(req,res,next)=>{
  const ticket = await Ticket.findById(req.params.TicketId);
  const seat = await Seat.findById(ticket.Seat.SeatId);
  seat.IsBooked=false;
  await seat.save();
 const oldFlight = await Flight.find({'_id':ticket.FlightId});
ticket.Cabin=="Economy"?oldFlight.Economy.SeatsLeft++:ticket.Cabin=="First"?oldFlight.First.SeatsLeft++:oldFlight.Business.SeatsLeft++;
await oldFlight.save();
const newFlight = await Flight.findById(req.params.ChosenFlightId);
ticket.Cabin=="Economy"?newFlight.Economy.SeatsLeft--:ticket.Cabin=="First"?newFlight.First.SeatsLeft--:newFlight.Business.SeatsLeft--;
ticket.Flight.FlightId=newFlight._id;
ticket.Flight.FlightNumber=newFlight.FlightNumber;
ticket.Flight.Departure.Date = newFlight.Departure.Date;
ticket.Flight.Departure.Time = newFlight.Departure.Time;
ticket.Flight.Arrival.Time = newFlight.Arrival.Time;
ticket.Flight.Arrival.Time = newFlight.Arrival.Time;
ticket.Flight.Arrival.Terminal = newFlight.Arrival.Terminal;
ticket.Flight.Departure.Terminal = newFlight.Departure.Terminal;

ticket.Seat.SeatId=null;
ticket.Seat.SeatNumber='';
if(ticked.IsChild==false)
ticket.Cabin=="Economy"?ticket.price=newFlight.Economy.Price:ticket.Cabin=="First"?ticket.price=newFlight.First.Price:ticket.price=newFlight.BusinessBaggage.Price;
else 
ticket.Cabin=="Economy"?ticket.price=newFlight.Economy.ChildPrice:ticket.Cabin=="First"?ticket.price=newFlight.First.ChildPrice:ticket.price=newFlight.BusinessBaggage.ChildPrice;
await user.save();
await newFlight.save();

await ticke.save();
})
module.exports = router;
