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
      address:{
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
        id:{type: mongoose.Schema.Types.ObjectId,required:true},
        economySeats:{type:Number,required:true},
        firstSeats:{type:Number,required:true},
        BusinessSeats:{type:Number,required:true}}],
    isAdmin:{
        type: Boolean,
        required: true
      },
});
function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const User = mongoose.model('User', userSchema);
module.exports = User;