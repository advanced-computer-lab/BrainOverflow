const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Flight  = require('./Flight');
const Ticket  = require('./Ticket');


const userSchema = new Schema({
    Email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    Passport:{
        type: String,
        required: true
      },
  FirstName:{
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
      LastName:{
        type: String,
        required: true
      },
    Password:{
        type:String,
        required:true
    },
     VisaNumber:{
        type:String,
        required:true
    }
,
    TicketsId: [{
      type: mongoose.Schema.Types.ObjectId,required:true,
        ref:"Ticket"},
          ],
    IsAdmin:{
        type: Boolean,
        required: true
      },
});
function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
};
const User = mongoose.model('User', userSchema);
module.exports = User;