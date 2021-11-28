const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    From : {
<<<<<<< Updated upstream:src/models/Flight.js
        type: String,
        required: true,
      },
      To:{
        type: String,
        required: true,
=======
        airport: { type: String,
          required:true },
        terminal: {type: Number,
        required: true},
      },
      To:{
        airport: { type: String,
          required:true },
        terminal: {type: Number,
        required: true},

>>>>>>> Stashed changes:backend/models/Flight.js
      },
      FlightDate:{
        type: Date,
        required:true,
      },
      Economy:{
<<<<<<< Updated upstream:src/models/Flight.js
        type: Number,
=======
        seats:{type: Number,
          required:true,
        },
        price:{type : Number,
          required:true,
        },
        baggage:{type : Number,
>>>>>>> Stashed changes:backend/models/Flight.js
        required:true,
      },
      },
      Business:{
<<<<<<< Updated upstream:src/models/Flight.js
        type: Number,
        required: true,
      },
      First:{
        type: Number,
        required: true
=======
        seats:{type: Number,
          required:true,
        },
        price:{type : Number,
          required:true,
        },
        baggage:{type : Number,
        required:true,
      },
      },
      First:{
        seats:{type: Number,
          required:true,
        },
        price:{type : Number,
          required:true,
        },
        baggage:{type : Number,
        required:true,
      },
>>>>>>> Stashed changes:backend/models/Flight.js
      },
    }, { timestamps: true });

      const Flight = mongoose.model('Flight', flightSchema);
      module.exports = Flight;