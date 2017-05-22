var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Medias = require('../models/medias');

var mediaRouter = express.Router();

mediaRouter.use(bodyParser.json());

mediaRouter.route('/')
.get(function(req,res,next){
    Medias.find({}, function (err, media) {
        if (err) throw err;
        res.json(media);
    });
})
.post(function (req, res, next){
	var mediaArray = req.body;
	for(var i =0; i < mediaArray.length; i++){
		Medias.create(mediaArray[i], function (err, media) {
			if (err) throw err;
			var id = media._id;
			console.log('created media with id: ' + id);			
			
		});
	}	
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('Added all medias');
})

.delete(function (req, res, next){
    Medias.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

mediaRouter.route('/horz-featured')
.get(function(req,res,next){
    Medias.find({orientation:"horizontal", featured:true}, function (err, media) {
        if (err) throw err;
        res.json(media);
    });
});

mediaRouter.route('/vert-featured')
.get(function(req,res,next){
    Medias.find({orientation:"vertical", featured:true}, function (err, media) {
        if (err) throw err;
        res.json(media);
    });
});

mediaRouter.route('/horz/:page-limit:limit')
.get(function(req,res,next){
	//Getting the limit and skip
	var limit = isNaN(req.params.limit)?10:Number(req.params.limit);
	var skip = isNaN(req.params.page)?0:Number((req.params.page-1)*limit);
	
	console.log('skip='+ skip + ", limit="+limit);
	Medias.find({orientation:"horizontal"},{},{skip:skip, limit:limit}, function (err, media) {
        if (err) throw err;
        res.json(media);
    });
});

mediaRouter.route('/vert/:page-limit:limit')
.get(function(req,res,next){
	//Getting the limit and skip
	var limit = isNaN(req.params.limit)?10:Number(req.params.limit);
	var skip = isNaN(req.params.page)?0:Number((req.params.page-1)*limit);
	
	console.log('skip='+ skip + ", limit="+limit);
	Medias.find({orientation:"vertical"},{},{skip:skip, limit:limit}, function (err, media) {
        if (err) throw err;
        res.json(media);
    });
});

mediaRouter.route('/:mediaId')
.get(function(req,res,next){
    Medias.findById(req.params.mediaId, function (err, media) {
        if (err) throw err;
        res.json(media);
    });
})

.put(function(req, res, next){
    Medias.findByIdAndUpdate(req.params.mediaId, {
        $set: req.body
    }, {
        new: true
    }, function (err, media) {
        if (err) throw err;
        res.json(media);
    });
})

.delete(function(req, res, next){
    Medias.findByIdAndRemove(req.params.mediaId, function (err, resp) {        
		if (err) throw err;
			res.json(resp);
    });
});

module.exports = mediaRouter;
