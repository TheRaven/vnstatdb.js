var CONFIG = require('config').vnstatdb;
var express = require('express');
 
var app = express();
 

function summary(req, res) {
    res.send({"hour":{"rx":"8547","tx":"3109"},"day":{"rx":588935,"tx":42222},"month":{"rx":4226515,"tx":670194},"total":{"act":1,"rx":4226515,"tx":670194}});
}


app.get('/', summary);
app.get('/summary', summary);
 
app.listen(CONFIG.http_port);