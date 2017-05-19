var express = require('express');
var morgan = require('morgan');

var hostname = 'http://diecgrillo-lojas.1d35.starter-us-east-1.openshiftapps.com';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/app'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
