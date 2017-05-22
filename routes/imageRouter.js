var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Images = require('../models/images');

var imageRouter = express.Router();

imageRouter.use(bodyParser.json());

imageRouter.route('/')
.get(function(req,res,next){
    Images.find({}, function (err, image) {
        if (err) throw err;
        res.json(image);
    });
})
.post(function (req, res, next){
	var imageArray = req.body;
	for(var i =0; i < imageArray.length; i++){
		Images.create(imageArray[i], function (err, image) {
			if (err) throw err;
			var id = image._id;
			console.log('created image with id: ' + id);

		});
	}

	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('Added all images');
})

.delete(function (req, res, next){
    Images.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

imageRouter.route('/horz-featured')
.get(function(req,res,next){
    Images.find({orientation:"horizontal", featured:true}, function (err, image) {
        if (err) throw err;
        res.json(image);
    });
});

imageRouter.route('/horz-size')
.get(function(req,res,next){
	Images.count({orientation:"horizontal"}, function(err, count){
		console.log( "Number of docs: ", count );
		res.json({size:count});
	});
});

imageRouter.route('/vert-size')
.get(function(req,res,next){
	Images.count({orientation:"vertical"}, function(err, count){
		console.log( "Number of docs: ", count );
		res.json({size:count});
	});
});

imageRouter.route('/horz/:category/:page-limit:limit')
.get(function(req,res,next){
	//Getting the limit and skip
	var limit = isNaN(req.params.limit)?10:Number(req.params.limit);
	var skip = isNaN(req.params.page)?0:Number((req.params.page-1)*limit);
  var category = req.params.category;

	console.log('skip='+ skip + ", limit="+limit);
	Images.find({orientation:"horizontal", categoria:category},{},{skip:skip, limit:limit}, function (err, image) {
        if (err) throw err;
        res.json(image);
    });
});

imageRouter.route('/vert/:category/:page-limit:limit')
.get(function(req,res,next){
	//Getting the limit and skip
	var limit = isNaN(req.params.limit)?10:Number(req.params.limit);
	var skip = isNaN(req.params.page)?0:Number((req.params.page-1)*limit);
  var category = req.params.category;

	console.log('skip='+ skip + ", limit="+limit);
	Images.find({orientation:"vertical", categoria:category},{},{skip:skip, limit:limit}, function (err, image) {
        if (err) throw err;
        res.json(image);
    });
});

imageRouter.route('/:imageId')
.get(function(req,res,next){
    Images.findById(req.params.imageId, function (err, image) {
        if (err) throw err;
        res.json(image);
    });
})

.put(function(req, res, next){
    Images.findByIdAndUpdate(req.params.imageId, {
        $set: req.body
    }, {
        new: true
    }, function (err, image) {
        if (err) throw err;
        res.json(image);
    });
})

.delete(function(req, res, next){
    Images.findByIdAndRemove(req.params.imageId, function (err, resp) {
		if (err) throw err;
			res.json(resp);
    });
});

module.exports = imageRouter;
