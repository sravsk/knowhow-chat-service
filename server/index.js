var http = require('http');
var express = require('express');
var path = require('path');

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;
