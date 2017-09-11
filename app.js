"use strict"

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var MongoClient = require('mongodb').MongoClient;

var mongo = require('mongodb');
var db = mongo.db;

var config = require('./config');

app.set('view engine', 'ejs');
app.use(express.static('assets'));

app.get('/', function(req,res){
  res.render('index');

});


app.post('/', function(req,res){
  db.collection("starRate").insertOne({'rating': data}, function(err, result){
    if (err) throw err;
    console.log("1 review inserted");
    res.redirect('/');
  });
});

MongoClient.connect(config.mongo_uri, function(err, database){
  if (err) throw err;
  console.log('succesfully connected to database');
  app.listen(3000, function(){
    console.log('successfully started the server');
  });
});
