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
  const details = req.body;
  const From = {'Airport': details.FromAirport, 'Terminal': details.FromTerminal };
  const To = { 'Airport': details.ToAirport, 'Terminal': details.ToTerminal };
  const Economy = { 'SeatId': [], 'Price': details.EconomyPrice, 'ChildPrice': details.EconomyChildPrice, 'Baggage': details.EconomyBaggage };
  const Business = { 'SeatId': [], 'Price': details.BusinessPrice, 'ChildPrice': details.BusinessChildPrice, 'Baggage': details.BusinessBaggage };
  const First = { 'SeatId': [], 'Price': details.FirstPrice, 'ChildPrice': details.FirstChildPrice, 'Baggage': details.FirstBaggage };
  const Departure = { 'Date': details.DepartureDate, 'Time': details.DepartureTime };
  const Arrival = { 'Date': details.ArrivalDate, 'Time': details.ArrivalTime };
  const flight = new Flight({ FlightNumber: details.FlightNumber, From: From, To: To, Economy: Economy, Business: Business, First: First, Departure: Departure, Arrival: Arrival });
  console.log(Departure.Date > Arrival.Date)
  console.log(Departure.Time <= Arrival.Time)
  // if(Departure.Date>Arrival.Date ||(Departure.Date==Arrival.Date && Departure.Time>=Arrival.Time))
  //       throw new ExpressError("The Arrival Must Be After Departure!", 400)
  // if(From.Airport==To.Airport)
  //     throw new ExpressError("Arrival and Departure Cities Must be different", 400)    
  // //const { error } = flightSchema.validate(flight);

  await flight.save();
  for (i = 1; i <= details.EconomySeats; i++) {
    const seat = new Seat({ 'SeatNumber': `E${i}`, 'IsBooked': false, 'FlightId': flight._id, 'Cabin': 'Economy' });
    flight.Economy.SeatId.push(seat);
    await flight.save();
    await seat.save();
  }
  for (i = 1; i <= details.BusinessSeats; i++) {
    const seat = new Seat({ 'SeatNumber': `B${i}`, 'IsBooked': false, 'FlightId': flight._id, 'Cabin': 'Business' });
    flight.Business.SeatId.push(seat);
    await flight.save();
    await seat.save();
  }
  for (i = 1; i <= details.FirstSeats; i++) {
    const seat = new Seat({ 'SeatNumber': `F${i}`, 'IsBooked': false, 'FlightId': flight._id, 'Cabin': 'First' });
    flight.First.SeatId.push(seat);
    await flight.save();
    await seat.save();
  }

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
  Flight.findByIdAndRemove({ _id: req.params.id },
    function (err, docs) {
      if (err) res.json(err);

    });
})


router.put("/updateFlight/:id", catchAsync(async (req, res) => {
  var _id = req.body._id;
  await Flight.findByIdAndUpdate(req.body);

}));


module.exports = router;