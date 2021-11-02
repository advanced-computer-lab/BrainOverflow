const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');

router.get('/viewFlights' ,(req, res) => {                                               ``
    Flight.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    });


//Creating new flight
/*app.post('/createFlight', async (req, res, next) => {
  const details = {
    "From": "Cairo",
    "To": "Amman",
    "FlightDate": "7/7/2020",
    "Economy": 10,
    "Business": 10,
    "First": 10
  }
  const flight = new Flight(details);
  await flight.save();

  res.send();
})



 
app.get('/flight/:id/delete', function(req, res){
User.findByIdAndRemove({_id: req.params.id}, 
   function(err, docs){
if(err) res.json(err);
else    res.redirect('/view');
});
})
*/




module.exports=router;