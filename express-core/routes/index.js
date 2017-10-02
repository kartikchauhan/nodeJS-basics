var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

var url = "mongodb://localhost:27017/test";

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Mongo'});
});

router.get('/get-data', function(req, res, next) {
	var userData = [];
	mongo.connect(url, function(err, db) {
		if(err)
			throw new err;
		var pointer = db.collection('user-data').find();
		pointer.forEach(function(data) {
			userData.push(data);
			console.log(data);
		}, function() {
			db.close();
			res.redirect('/');
		});
	});
});

router.post('/insert', function(req, res, next) {
	var item = {
		'username': req.body.username,
		'age': req.body.age,
		'email': req.body.email
	};
	mongo.connect(url, function(err, db) {
		if(err)
			throw new err;
		db.collection('user-data').insertOne(item, function(err, result) {
			if(err)
				throw new err;
			console.log('Item inserted');
			db.close();
			res.redirect('/');
		});
	});
});

module.exports = router;
