const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');


//Creating new flight
app.post('/createFlight',async(req,res,next)=>{
    const details={
        "From":"Cairo",
        "To":"Amman",
        "FlightDate":"7/7/2020",
        "Economy":10,
        "Business":10,
        "First":10
    }
    const flight = new Flight(details);
    await flight.save();
  
    res.send();
  })


module.exports=router;