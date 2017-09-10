var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var util = require('util');

var Products = require('../models/products');
var Images = require('../models/images');

var productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
.get(function(req,res,next){
    Products.find({}, function (err, prod) {
        if (err) throw err;
        res.json(prod);
    });
})
.post(function (req, res, next){
    var product = req.body;
    console.log(product);

    Products.create(product, function (err, prod) {
        if (err)
        {
            err.status = 400;
            return next(err);
        }
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(""+prod._id);
		});
})
.delete(function (req, res, next){
    Products.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


productRouter.route('/:id')
.delete(function (req, res, next){
    var id = req.params.id;
    Products.findByIdAndRemove(id, function(err, product){
        if(err){
            err.status = 404;
            return next(err);
        }
        console.log(product);
        var imageId = product.image;
        Images.findByIdAndRemove(imageId, function(err, image){
            if(err){
                err.status = 404;
                return next(err);
            }
            res.json(image);
        });
    });
});

productRouter.route('/:category/all/size')
.get(function(req,res,next){
    var category = req.params.category;
  	Products.count({category:category}, function(err, count){
  		  console.log( "Number of docs: ", count );
  		  res.json({size:count});
  	});
});

productRouter.route('/:category/all/:page-limit:limit')
.get(function(req,res,next){
	//Getting the limit and skip
	var limit = isNaN(req.params.limit)?10:Number(req.params.limit);
	var skip = isNaN(req.params.page)?0:Number((req.params.page-1)*limit);
  var category = req.params.category;

	console.log('skip='+ skip + ", limit="+limit);
	Products.find({category:category},{},{skip:skip, limit:limit}).populate('image').exec(function (err, product) {
        if (err) throw err;
        res.json(product);
    });
});


productRouter.route('/:category/:brand/size')
.get(function(req,res,next){
    var category = req.params.category;
    var brand = req.params.brand;
  	Products.count({category:category, brand:brand}, function(err, count){
  		  console.log( "Number of docs: ", count );
  		  res.json({size:count});
  	});
});

productRouter.route('/:category/:brand/:page-limit:limit')
.get(function(req,res,next){
	//Getting the limit and skip
	var limit = isNaN(req.params.limit)?10:Number(req.params.limit);
	var skip = isNaN(req.params.page)?0:Number((req.params.page-1)*limit);
  var category = req.params.category;
  var brand = req.params.brand;

	console.log('skip='+ skip + ", limit="+limit);
	Products.find({category:category, brand:brand},{},{skip:skip, limit:limit}).populate('image').exec(function (err, product) {
        if (err) throw err;
        res.json(product);
    });
});

module.exports = productRouter;
