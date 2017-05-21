var express = require('express');
var morgan = require('morgan');
var eps     = require('ejs');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    hostname   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(morgan('dev'));

app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + 'app/index.html');
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
