'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
	name: String,
	desc: String,
	category: String,
	price: Number,
	image: String
})

module.exports = mongoose.model('Food',FoodSchema);