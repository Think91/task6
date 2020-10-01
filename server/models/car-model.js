const mongoose = require('mongoose')
const Schema = mongoose.Schema
    // const Car = new Schema(
    // 		{
    // 			make: { type: String, required: true },
    //  			year: { type: [String], required: true },
    //  			registration: { type: Number, required: true },
    //  		},
    //  	{ timestamps: true },
    //)

const Car = new Schema({
    make: { type: String, required: true },
    year: { type: Number, required: true },
	registration: { type: String, required: true },
	address: {type: String, required: true}
}, { timestamps: true })

module.exports = mongoose.model('cars', Car)