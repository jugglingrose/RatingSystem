"use strict"

var express = require('express');
var app = express();

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

//require mongo db
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


//access mongo db password//
var config = require('./config');

app.set('view engine', 'ejs');
app.use(express.static('assets'));


app.get('/', function(req,res){
  res.render('index');
});

app.post('/', function(req,res){
  console.log("post to database called");
  console.log(db);
  db.collection("starRate").insertOne({'rating': data}, function(err, result){
    if (err) throw err;
    console.log("1 review inserted");
    res.redirect('/');
  });
});

MongoClient.connect(config.mongo_uri, function(err, database){
  if (err) throw err;
  console.log('succesfully connected to database');
  var db = database;
  app.listen(3000, function(){
    console.log('successfully started the server');
  });
});
