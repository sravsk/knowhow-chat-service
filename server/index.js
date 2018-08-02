var http = require('http');
var express = require('express');
var path = require('path');

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, '../client/dist')));


app.listen(5000, function(){
  console.log('listening on PORT:5000');
});