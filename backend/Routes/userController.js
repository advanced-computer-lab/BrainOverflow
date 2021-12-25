const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const Seat = require('../models/Seat');
const Ticket = require('../models/Ticket');
const nodemailer = require('nodemailer');
const auth = require ('../middleware/auth');

router.use(bodyParser.json())
const Stripe = require('stripe');
const { error } = require('console');
const stripe = Stripe('sk_test_51K8UnBGmD9zb7igMlNQnyWl8REycCu9x2zgLsIcLodnv2rTucM4NUalCuSztqQsL3fMUjIAoUxH35BM1VSlf246E00oaWXnrh3');


router.use(bodyParser.urlencoded({ extended: true }))
router.post("/refund/:TicketId",async(req,res)=>{

  const ticketId = req.params.TicketId;
  const ticket =await Ticket.findById(ticketId);
  const paymentId = ticket.PaymentId;
  console.log("ana neela")
const amount = req.body.amount;
const refund = await stripe.refunds.create({
  payment_intent: paymentId,
  amount: Math.abs(amount)*100,
});
res.json({
  message: "Refund succeeded",
  success: true
})
})
router.post("/payment", async (req, res) => {
	let { amount, id } = req.body;
  console.log("ana metnayel fel payment")
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "flight payment",
			payment_method: id,
			confirm: true
		})
    const paymentId= payment.id;
		console.log("Payment",paymentId)

	res.send({paymentId:paymentId}
    )
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
}
)
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
 
router.post("/mailmyTicket",auth,catchAsync (async(req,res)=>{
  
  const user = await User.findById(req.user);
  
  const ticket= req.body;
  const Flight = req.body.Flight;
  console.log(req.body.Flight);
  const Departure= req.body.Departure;
  const Arrival= req.body.Arrival
  var mailOptions = {
    from: 'sky.overflow.flight@gmail.com' ,
    to: user.Email,
    subject: 'Your Ticket',
    text: 
    `Here is your Ticket Info for Passenger ${ticket.Name}
    FlightNumber:${Flight.Number},
    Ticket Number: ${ticket._id},
    From: ${Departure.Airport},
    To: ${Arrival.Airport},
    Class: ${ticket.Cabin},
    Date: ${Departure.Date},
    Departs At: ${Departure.Time},
    Arrives At: ${Arrival.Time},
    Departure Terminal: ${Departure.Terminal},
    Arrival Terminal: ${Arrival.Terminal}`}

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
 
}))

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
 
const  user = await User.findById(req.user);
  console.log(user);
  if(user==''){  res.status(404).send({
    message: 'User not found!'
 });}
  res.send(user);
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
  console.log(req.params.SeatId);
  const user=await User.findById(req.user);
  const seat =await Seat.findById(req.params.SeatId);
  const oldSeat =await Seat.findById(req.params.OldSeat);
  console.log(seat);
  const ticket =await Ticket.findById(req.params.TicketId);
  ticket.Seat.SeatId=seat._id;
  ticket.Seat.SeatNumber=seat.SeatNumber;
  seat.IsBooked=true;
  await ticket.save();
  await seat.save();
  await user.save();
  console.log('end')

}));
router.get('/viewSeats/:FlightId/:Cabin/:TicketId',auth,catchAsync(async(req,res,next)=>{
  //console.log("I CAME HEREEE")
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
 
 router.post('/confirmReserved',auth, catchAsync(async (req, res, next) => {
  const details = req.body.Summary;
  const paymentId=req.body.paymentId;
  const user = await User.findById(req.user);
  console.log("payment fel confirm",paymentId);

  const goingflight = await Flight.findById(details.DepartureId)
    .catch(err => {
      res.send(err);
    });
  const returnflight = await Flight.findById(details.ReturnFlightId).catch(err => {
    res.send(err);
  });


  for (i = 0; i < parseInt(details.Children); i++) {
    const ticketgoing = new Ticket( {'PaymentId':paymentId,'Name':details.ChildrenNames[i] ,'UserId':req.user , 
    'Flight':{'FlightId':details.DepartureId  ,'Number':goingflight.FlightNumber},'Departure':
    {'Airport':goingflight.From.Airport ,'Terminal':goingflight.From.Terminal ,'Date':goingflight.Departure.Date ,'Time':goingflight.Departure.Time},
      'Arrival':{'Airport':goingflight.To.Airport,'Terminal':goingflight.To.Terminal,'Date':goingflight.Arrival.Date ,'Time':goingflight.Arrival.Time }
      ,'Cabin':details.Cabin,'Price':details.DeparturePriceChild,'Seat':{'SeatId':null,'SeatNumber':''},'IsChild':true});
      
      const ticketreturn = new Ticket( {'PaymentId':paymentId,'Name':details.ChildrenNames[i],'UserId':req.user  , 
      'Flight':{'FlightId':details.ReturnFlightId  ,'Number':returnflight.FlightNumber},'Departure':
      {'Airport':returnflight.From.Airport ,'Terminal':returnflight.From.Terminal ,'Date':returnflight.Departure.Date ,'Time':returnflight.Departure.Time},
        'Arrival':{'Airport':returnflight.To.Airport,'Terminal':returnflight.To.Terminal,'Date':returnflight.Arrival.Date ,'Time':returnflight.Arrival.Time }
        ,'Cabin':details.Cabin,'Price':details.ReturnPriceChild,'Seat':{'SeatId':null,'SeatNumber':''},'IsChild':true});
    user.TicketsId.push(ticketgoing._id);
    user.TicketsId.push(ticketreturn._id);
    (details.Cabin == 'Economy') ? goingflight.Economy.SeatsLeft-- : (details.Cabin == 'First') ? goingflight.First.SeatsLeft-- : goingflight.Business.SeatsLeft--;
    await user.save();
    await ticketgoing.save();
    await ticketreturn.save();
  }
  for (i = 0; i < parseInt(details.Adults); i++) {
    const ticketgoing = new Ticket( {'PaymentId':paymentId,'Name':details.AdultNames[i] ,'UserId':req.user , 
    'Flight':{'FlightId':details.DepartureId  ,'Number':goingflight.FlightNumber},'Departure':
    {'Airport':goingflight.From.Airport ,'Terminal':goingflight.From.Terminal ,'Date':goingflight.Departure.Date ,'Time':goingflight.Departure.Time},
      'Arrival':{'Airport':goingflight.To.Airport,'Terminal':goingflight.To.Terminal,'Date':goingflight.Arrival.Date ,'Time':goingflight.Arrival.Time }
      ,'Cabin':details.Cabin,'Price':details.DeparturePriceAdult,'Seat':{'SeatId':null,'SeatNumber':''},'IsChild':false});
      const ticketreturn = new Ticket( {'PaymentId':paymentId,'Name':details.AdultNames[i] ,'UserId':req.user  , 
      'Flight':{'FlightId':details.ReturnFlightId  ,'Number':returnflight.FlightNumber},'Departure':
      {'Airport':returnflight.From.Airport ,'Terminal':returnflight.From.Terminal ,'Date':returnflight.Departure.Date ,'Time':returnflight.Departure.Time},
        'Arrival':{'Airport':returnflight.To.Airport,'Terminal':returnflight.To.Terminal,'Date':returnflight.Arrival.Date ,'Time':returnflight.Arrival.Time }
        ,'Cabin':details.Cabin,'Price':details.ReturnPriceAdult,'Seat':{'SeatId':null,'SeatNumber':''},'IsChild':false});
        (details.Cabin=='Economy')?goingflight.Economy.SeatsLeft--:(details.Cabin=='First')?goingflight.First.SeatsLeft--:goingflight.Business.SeatsLeft--;
    user.TicketsId.push(ticketgoing);
    user.TicketsId.push(ticketreturn);
    await user.save();
    await ticketgoing.save();
    await ticketreturn.save();
  }
	res.json({
    message: "Reservation successful",
    success: true
  })
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
router.get('/changeFlight/:TicketId',auth,async(req,res,next)=>{
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
router.put('/changeFlight/:TicketId/:ChosenFlightId',auth,async(req,res,next)=>{
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
router.post('/editFlightSearch/:ticketId',auth,async(req,res,next)=>{
  console.log("Iam the request body",req.body)
  const ticket = await Ticket.findById(req.params.ticketId).catch(error=>{
    console.log(error);
  });
const departure = req.body.Departure;
  const Cabin = req.body.Cabin;
  var flights = null;
console.log(ticket.Departure.Airport,ticket.Arrival.Airport,departure)
  if(Cabin =="Economy"){
     flights = await Flight.find({'From.Airport':ticket.Departure.Airport,'To.Airport':ticket.Arrival.Airport,'Economy.SeatsLeft':{$gt:0}}).catch(
    (error) => {
      res.status(400).json({
        message: "No flights"
      });
    }
  );
  }else if(Cabin =="First"){
   flights = await Flight.find({'From.Airport':ticket.Departure.Airport,'To.Airport':ticket.Arrival.Airport,'First.SeatsLeft':{$gt:0}}).catch(
    (error) => {
      res.status(400).json({
        message: "No flights"
      });
    }
  );
  }else 
   flights = await Flight.find({'From.Airport':ticket.Departure.Airport,'To.Airport':ticket.Arrival.Airport,'Business.SeatsLeft':{$gt:0}}).catch(
    (error) => {
      res.status(400).json({
        message: "No flights"
      });
    }
  );

    if(flights==null) { 
      console.log("HEHEHE"),

      res.status(400).json({
      message: "No flights available with similar criteria"
    })}
    else{
      const x = new Date(departure);
      console.log(x.getFullYear())
      console.log(x.getMonth())
      console.log(x.getDate())
      const myFlights =[];
flights.forEach(flight => {
  if((flight.Departure.Date.getFullYear()==x.getFullYear())&&(flight.Departure.Date.getMonth()==x.getMonth())&&(flight.Departure.Date.getDate()==x.getDate())){
    console.log("hasal")
    myFlights.push(flight);
  }
});

  //     const myFlights = flights.filter((flight)=>
  //     {console.log(flight.Departure.Date.getFullYear()==x.getFullYear())&&
  //      console.log( flight.Departure.Date.getMonth()==x.getMonth() )&&
  //  console.log( (flight.Departure.Date.getDate()==x.getDate()))
  // })
      console.log(myFlights)
      res.send({flights:myFlights,ticket:ticket});
    }
  

  })


module.exports = router;
