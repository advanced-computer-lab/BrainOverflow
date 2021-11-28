const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');

const catchAsync=func=>{
    return (req,res,next)=>{
        func(req,res,next).catch(next);
    }
  }

