var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var eps     = require('ejs');

// default to a 'localhost' configuration:
//var connection_string = '127.0.0.1:27017/template';

var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL, 
	mongoURLLabel = "";

console.log("###############0" + mongoURL);

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
	
	console.log("###############1 $$$");
	var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
		mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
		mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
		mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
		mongoPassword = process.env[mongoServiceName + '_PASSWORD']
		mongoUser = process.env[mongoServiceName + '_USER'];

	if (mongoHost && mongoPort && mongoDatabase) {
		console.log("###############2 $$$");
		mongoURLLabel = mongoURL = 'mongodb://';
		if (mongoUser && mongoPassword) {
		  mongoURL += mongoUser + ':' + mongoPassword + '@';
		}
		// Provide UI label that excludes user id and pw
		mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
		mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
		console.log("###############3 $$$" + mongoURL);
	} 
}else if (mongoURL == null){
		mongoURL = 'mongodb://127.0.0.1:27017/template'
		console.log("###############4 $$$" + mongoURL);
}


// if OPENSHIFT env variables are present, use the available connection info:
/*if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	console.log("###############1");
	
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
  console.log("###############2" + connection_string);
}*/


//var url = 'mongodb://'+connection_string;
mongoose.connect(mongoURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server: " + mongoURL);
});

var index = require('./routes/index');
var users = require('./routes/users');
var mediaRouter = require('./routes/mediaRouter');
var imageRouter = require('./routes/imageRouter');

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
