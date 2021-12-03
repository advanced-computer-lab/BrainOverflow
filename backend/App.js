const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');


const { MongoClient } = require('mongodb');
const MongoURI = "mongodb+srv://admin:12345@cluster0.zvvff.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//Models
const User= require('./models/User')


//Routes
const adminRoutes = require('./Routes/adminController');
const userRoutes= require('./Routes/userController');

//App variables
const app = express();
const port = process.env.PORT || "8000";
const Flight = require('./models/Flight');
// #Importing the userController

app.use(express.json());
// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));



app.use(cors({ origin: true, credentials: true }));

//ROutes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);





// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
