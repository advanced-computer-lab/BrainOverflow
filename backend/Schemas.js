const Joi = require('joi-oid')
const { number } = require('joi');


module.exports.flightSchema = Joi.object({
    FlightNumber:Joi.string().required(),
    From: Joi.object({
        Airport: Joi.string().required(),
        Terminal: Joi.number().required().min(0),
    }).required(),
    To: Joi.object({
        Airport: Joi.string().required(),
        Terminal: Joi.number().required().min(0),
    }).required(),
    Economy: Joi.object({
        SeatId:[Joi.objectId().required()],
        Price: Joi.number().required().min(0),
        ChildPrice: Joi.number().required().min(0),
        Baggege: Joi.number().required().min(0),
    }).required(),
    Business: Joi.object({
        SeatId:[Joi.objectId().required()],
        Price: Joi.number().required().min(0),
        ChildPrice: Joi.number().required().min(0),
        Baggege: Joi.number().required().min(0),
    }).required(),
    First: Joi.object({
        SeatId:[Joi.objectId().required()],
        Price: Joi.number().required().min(0),
        ChildPrice: Joi.number().required().min(0),
        Baggege: Joi.number().required().min(0),
    }).required(),
});

// module.exports.reviewSchema = Joi.object({
//     review: Joi.object({
//         rating: Joi.number().required().min(1).max(5),
//         body: Joi.string().required()
//     }).required()
// })