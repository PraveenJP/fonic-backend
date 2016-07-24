'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Food = require('./food.model');
var Category = require('./category.model');

// Port Config
var PORT = process.env.PORT || 3000;

// MongoDB Connection
var db = 'mongodb://jpfonic:fonic123@ds029715.mlab.com:29715/fonic';
mongoose.connect(db);

// Use Body parser
app.use(bodyParser.json()); // Allow to use json parse element
app.use(bodyParser.urlencoded({ // Allow use to receive the body element through the url
	extended:true
}));

// Start Domain
app.get('/',function(req, res){
	res.send('Awesome mongoDB');
});

// Get all foods data
app.get('/foods',function(req,res){
	Food.find({}).exec(function(err,foods){
		if(err){
			res.send('Error has occured' +err);
		}else{
			res.json(foods);
		}
	});
});

// Get all categories data
app.get('/category',function(req,res){
	Category.find({}).exec(function(err,category){
		if(err){
			res.send('Error has occured' +err);
		}else{
			res.json(category);
		}
	});
});

// Get Particular food detail
app.get('/foods/:category',function(req,res){
	Food.find({category:req.params.category}).exec(function(err, food){
		if(err){
			console.log(err);
		}else{
			res.json(food);
		}
	});
});

// Add food into the Database
app.post('/foods',function(req,res){
	var newFood = new Food();

	newFood.name = req.body.name;
	newFood.desc = req.body.desc;
	newFood.category = req.body.category;
	newFood.price = req.body.price;
	newFood.image = req.body.image;

	newFood.save(function(err, food){
		if(err){
			res.send('Error saving foods');
		}else{
			res.send(200);
		}
	})
});

// Add category into the Database
app.post('/category',function(req,res){
	var newCategory = new Category();

	newCategory.name = req.body.name;
	newCategory.slug = req.body.slug;

	newCategory.save(function(err, food){
		if(err){
			res.send('Error saving category');
		}else{
			res.send(200);
		}
	})
});

// Delete book from the database
app.delete('/foods/:id',function(req,res){
	Food.findOneAndRemove({_id:req.params.id},function(err,food){
		if(err){
			res.send(err);
		}else{			
			res.send(200);
		}
	});
});

//Listen Port
app.listen(PORT,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Server running on:" +PORT);
	}
});