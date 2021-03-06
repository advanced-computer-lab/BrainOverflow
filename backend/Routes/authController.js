const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require ('../middleware/auth');
const { Console } = require('console');
// The Guest User should be able to enter their details in a form including first name,
//  lastname, home address, countrycode, telephone number(s), email and passport number.

router.post("/signup",async(req,res)=>
{try{ 

     const{firstname,lastname,address,countrycode,
        phone,passport,email,password,passwordverify}=req.body;


        if (!firstname||!lastname||!address||!countrycode||
            !phone||!passport||!email||!password||!passwordverify){
                return res.status(400).json({errorMessage:"Please enter all required fields."})
            }
        if (password.length<6){
            return res.status(400).json({errorMessage:"your password is too short"})
        }
        if (password !== passwordverify)
        {
            return res.status(400).json({errorMessage:"the passwords don't match!"})
        }
         const existingUser= await User.findOne( {Email: email});
         if (existingUser){
            return res.status(400).json({errorMessage:"there's already exists an account with this email"})
         }
         const salt = await bcrypt.genSalt();
         const passwordHash = await bcrypt.hash(password, salt);
     const newUser=  new User( { Email: email,Passport: passport,FirstName:firstname,Address:address,Country:countrycode,
        PhoneNumber: phone, LastName: lastname,Password:passwordHash,TicketsId:[] ,IsAdmin:false});
        console.log(newUser);
      const savedUser= await newUser.save();
      const token= jwt.sign({user:savedUser._id}, process.env.ACCESS_TOKEN_SECRET);
      res.cookie('token',token,{httpOnly:true}).send();
        }
      
        catch(err){
            console.error(err);
            res.status(500).send();
        }
    
})

router.post("/login" ,async(req,res)=>{
    try{
         const {email, password}= req.body;
         if (!email|| !password){
            return res.status(400).json({errorMessage:"Please enter all required fields."}
            );

         }
      
         
         const existingUser =  await User.findOne({Email:email});
         if (!existingUser){
            return res.status(400).json({errorMessage:"Wrong email or pasword"});}
             

         const passwordCorrect = await bcrypt.compare(password, existingUser.Password);
         if (!passwordCorrect){
            return res.status(400).json({errorMessage:"Wrong email or pasword"});
            
         }
         console.log ("done login");
         const token= jwt.sign({user:existingUser._id}, process.env.ACCESS_TOKEN_SECRET);
         res.cookie('token',token,{httpOnly:true}).send();
    }
    catch(err){
        console.error(err);
        res.status(500).send();
    }
}
)

router.get ('/loggedIn',(req,res)=>{
    try {console.log("I'm here");
        const token = req.cookies.token;
        console.log(token);
        if (!token){
            return res.json(false);
       }
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    res.send(true); 
    console.log("done context");
}
           catch(err){
               console.error(err);
               res.json(false);
       
           }
})

router.post("/changepass", auth, async (req, res) => {
    try{
    const{ oldpass, newpass,newpassverify}=req.body;

    const user = await User.findById(req.user);

    if (!oldpass|| !newpass||!newpassverify){
        console.log("Please enter all required fields.");
      return res.status(400).json({errorMessage:"Please enter all required fields."});
  }
      const passwordCorrect = await bcrypt.compare(oldpass, user.Password);
      if (!passwordCorrect){
        console.log("Wrong password");
         return res.status(400).json({errorMessage:"Wrong password"});
         
      }
      if (newpass !== newpassverify)
      {console.log("the passwords don't match!");
          return res.status(400).json({errorMessage:"the passwords don't match!"})
      }
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newpass, salt);
      console.log(passwordHash);
       
      User.findByIdAndUpdate({
        _id: req.user
      }, {Password:passwordHash} ).then(
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
      

   }
    catch(err){
    console.error(err);
    res.status(500).send();
  }} );



  router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
  });
module.exports = router;