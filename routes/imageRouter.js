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
  	var image = req.body;
    if(image.path){
        var root = image.path.split("/");
        console.log(root[0]);
        image.path = image.path.replace(root[0]+"/", "");
        console.log(image.path);
    }
  	Images.create(image, function (err, img) {
        if (err)
        {
            err.status = 400;
            return next(err);
        }
        res.json(img);
		});
})

.delete(function (req, res, next){
    Images.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

imageRouter.route('/carousel')
.get(function(req,res,next){
    Images.find({tag:"carousel"}, function (err, image) {
        if (err) {
            err.status = 400;
            return next(err);
        }
        res.json(image);
    });
});

imageRouter.route('/:imageId')
.get(function(req,res,next){
    Images.findById(req.params.imageId, function (err, image) {
        if (err) {
            err.status = 400;
            return next(err);
        }
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
