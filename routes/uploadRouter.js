var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs-extra');

var imagePath = './app/images/';

var SUCCESS = "SUCCESS";
var ERR_TYPE_NOT_SUPPORTED = "ERR_TYPE_NOT_SUPPORTED";
var ERR_FILE_ALREADY_EXISTS = "ERR_FILE_ALREADY_EXISTS";

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let category = req.params.category;
    let path = imagePath + "/" + category;
    fs.mkdirsSync(path);
    callback(null, path);
  },
  filename: (req, file, callback) => {
    //originalname is the uploaded file's name with extn
    callback(null, file.originalname);
  }
});

var fileFilter = function(req, file, callback) {
    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        req.data.filename = file.originalname;
        //Check if type is supported
        if (file.mimetype !== 'image/png'
          && file.mimetype !== 'image/jpeg'
          && file.mimetype !== 'image/jpg'
          && file.minetype !== 'image/gif') {
            req.data.returncode = ERR_TYPE_NOT_SUPPORTED;
            return callback(null, false);
        }


        //Check if file already exists
        var path = imagePath + req.params.category+ "/" +file.originalname;
        if(fs.existsSync(path) == true){
            req.data.returncode = ERR_FILE_ALREADY_EXISTS;
            return callback(null, false);
        }
        callback(null, true);

    } else {
        console.log("EEEEEE");
        req.data.returncode = ERR_FILE_ALREADY_EXISTS;
        return callback(null, false);
    }
};

var onError = function(err, next) {
    console.log("onError: " + err);
    err.status = 400;
    return next(err);
};

var maxSize = 15 * 1000 * 1000;

var upload = multer({
    storage: storage,
    onError: onError,
    fileFilter: fileFilter,
    limits: { fileSize: maxSize }
}).single('file');

var uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/:category')
.post(function (req, res, next){

    req.data = {
      filename: "",
      returndata: "",
      returncode: SUCCESS
    }

    upload(req, res, function(err, file){
        if(err){
            if(err.code) {
                console.log("Error: " + err.code);
                req.data.returncode = err.code;
                res.send(req.data);
                return;
            } else {
                err.status = 500;
                return next(err);
            }
        }
        if(req.data.returncode == SUCCESS){
            req.data.filename = req.file.filename;
            req.data.returndata = req.file.path
        }
        res.send(req.data);
    });

});
module.exports = uploadRouter;
