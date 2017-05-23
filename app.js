var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var eps     = require('ejs');

var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;

if (mongoURL == null){
	mongoURL = 'mongodb://127.0.0.1:27017/template';
}

console.log("MongoURL = " + mongoURL);

mongoose.connect(mongoURL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

//Routes
var index = require('./routes/index');
var users = require('./routes/users');
var mediaRouter = require('./routes/mediaRouter');
var imageRouter = require('./routes/imageRouter');

// Starting app
var app = express();

// view engine setup
app.engine('html', eps.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app')));
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);
app.use('/users', users);
app.use('/media', mediaRouter);
app.use('/image', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
