const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    passport:{
        type: String,
        required: true
      },
  firstName:{
        type: String,
        required: true
      },
      Address:{
        type: String,
        required: true
      },
      PhoneNumber:{
        type: String,
        required: true
      },
      phoneNumber:{
        type: Number,
        required: true
      },
      lastName:{
        type: String,
        required: true
      },
    password:{
        type:String,
        required:true
    },
     visaNumber:{
        type:String,
        required:true
    }
    ,
    flights: [{
        id: mongoose.Schema.Types.ObjectId,
        economySeats:Number,
        firstSeats:Number,
        BusinessSeats:Number
    }],
    isAdmin:{
        type: Boolean,
        required: true
      },
});
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const User = mongoose.model('User', userSchema);
module.exports = User;