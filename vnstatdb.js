var CONFIG = require('config').vnstatdb;
var express = require('express');

var routes = require('./routes/summary'); 
var app = express();





app.get('/', routes.summary);
app.get('/summary', routes.summary);
 
app.listen(CONFIG.http_port);