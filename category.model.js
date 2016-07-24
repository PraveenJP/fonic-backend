'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: String,
	slug: String
})

module.exports = mongoose.model('Category',CategorySchema);