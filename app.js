var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('./config/morgan')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
require('./route')(app);
app.use(morgan)

app.use(function(req,res,next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use(function(err,req,res,next){
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status|| 500);
  res.json({code:1,message:err.message||'error'})
});

module.exports = app;
