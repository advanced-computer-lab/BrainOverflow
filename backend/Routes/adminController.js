const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const Seat = require('../models/Seat');
const { flightSchema } = require('../schemas.js');
const ExpressError = require('../ExpressError');
const catchAsync = func => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  }
}
const validateFlight = (req, res, next) => {
  const { error } = flightSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}
//View all flights 
router.get('/viewFlights', (req, res) => {
  ``
  Flight.find({})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});


//Creating new flight
router.post('/createFlight', catchAsync(async (req, res, next) => {
  console.log(req.body);
  const details = req.body;
  const From = {'Airport': details.FromAirport, 'Terminal': details.FromTerminal };
  const To = { 'Airport': details.ToAirport, 'Terminal': details.ToTerminal };
  const Economy = { 'SeatId': [], 'Price': details.EconomyPrice, 'ChildPrice': details.EconomyChildPrice, 'Baggage': details.EconomyBaggage ,'SeatsLeft':details.EconomySeats};
  const Business = { 'SeatId': [], 'Price': details.BusinessPrice, 'ChildPrice': details.BusinessChildPrice, 'Baggage': details.BusinessBaggage,'SeatsLeft':details.BusinessSeats };
  const First = { 'SeatId': [], 'Price': details.FirstPrice, 'ChildPrice': details.FirstChildPrice, 'Baggage': details.FirstBaggage,'SeatsLeft':details.FirstSeats};
  const Departure = { 'Date': details.DepartureDate, 'Time': details.DepartureTime };
  const Arrival = { 'Date': details.ArrivalDate, 'Time': details.ArrivalTime };
  const flight = new Flight({ FlightNumber: details.FlightNumber, From: From, To: To, Economy: Economy, Business: Business, First: First, Departure: Departure, Arrival: Arrival });
  // if(Departure.Date>Arrival.Date ||(Departure.Date==Arrival.Date && Departure.Time>=Arrival.Time))
  //       throw new ExpressError("The Arrival Must Be After Departure!", 400)
  // if(From.Airport==To.Airport)
  //     throw new ExpressError("Arrival and Departure Cities Must be different", 400)    
  // //const { error } = flightSchema.validate(flight);

  for (i = 1; i <= details.EconomySeats; i++) {
    const seat = new Seat({ 'SeatNumber': `E${i}`, 'IsBooked': false, 'FlightId': flight._id, 'Cabin': 'Economy' });
    flight.Economy.SeatId.push(seat);
    await seat.save();
  }
  for (i = 1; i <= details.BusinessSeats; i++) {
    const seat = new Seat({ 'SeatNumber': `B${i}`, 'IsBooked': false, 'FlightId': flight._id, 'Cabin': 'Business' });
    flight.Business.SeatId.push(seat);
    await seat.save();
  }
  for (i = 1; i <= details.FirstSeats; i++) {
    const seat = new Seat({ 'SeatNumber': `F${i}`, 'IsBooked': false, 'FlightId': flight._id, 'Cabin': 'First' });
    flight.First.SeatId.push(seat);
    await seat.save();
  }
  await flight.save()

}));
router.get('/viewFlights', (req, res) => {
 
  Flight.find({})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/updateFlight/:id', (req, res) => {
  Flight.findById(req.params.id).then(result => {
    //console.log(result);
    res.send(result);
  })
    .catch(err => {
      console.log(err);
    });
});

router.delete('/delete/:id', function (req, res) {
  const flight = Flight.findById(req.params.id);
  for(var i=0;i<flight.First.SeatId.length;i++){
    Seat.findByIdAndDelete(flight.First.SeatId[i]._id);
  }
  for(var i=0;i<flight.Business.SeatId.length;i++){
    Seat.findByIdAndDelete(flight.Business.SeatId[i]._id);
  }
  for(var i=0;i<flight.Economy.SeatId.length;i++){
    Seat.findByIdAndDelete(flight.Economy.SeatId[i]._id);
  }
  const tickets = Ticket.find({'FlightId':req.params.id});
  for(var i=0;i<tickets.length;i++){
    Ticket.findByIdAndDelete(tickets[i]._id)
  }
  Flight.findByIdAndRemove({ _id: req.params.id },
    function (err, docs) {
      if (err) res.json(err);

    });
})


router.put("/updateFlight/:id", catchAsync(async (req, res) => {
  //console.log("req",req.body);
  const flight =await  Flight.findById(req.params.id);
  await Flight.findByIdAndUpdate(req.params.id,{FlightNumber:req.body.flight.FlightNumber,'Departure.Date':req.body.DepDate,
'Departure.Time':req.body.DepTime,'Arrival.Date':req.body.ArrDate,'Arrival.Time':req.body.ArrTime,
'To.Airport':req.body.ToAirport,'To.Terminal':req.body.ToTerminal,'From.Airport':req.body.DepAirport,
'From.Terminal':req.body.DepTerminal,'First.Price':req.body.FirstPrice,'First.ChildPrice':req.body.FirstChildPrice,
'First.Baggage':req.body.FirstBaggage,'Business.Baggage':req.body.BusBaggage,'Business.Price':req.body.busPrice,
'Business.ChildPrice':req.body.BusChildPrice,
'Economy.Price':req.body.EcoPrice,
'Economy.ChildPrice':req.body.EcoChildPrice,
'Economy.Baggage':req.body.EcoBaggage
});
 console.log('edited' , flight)
  await flight.save();


}));


module.exports = router;