"use strict"

var express = require('express');
var app = express();

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

//require mongo db
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var db = null;


//access mongo db password//
var config = require('./config.secret');

const expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb(config.mongo_uri));


app.set('view engine', 'ejs');
app.use(express.static('assets'));


app.get('/', function(req,res){
  //get the avg of all of the reviews in the DB//
  req.db.collection("starRate").aggregate([
    {$group: {_id:null, total:{$avg:"$rating"}}}],
    function(err,result) {
      if (err) throw err;
      console.log(result);
      //round the avg//
      if(result.length !== 0){
        var total = Math.round(result[0].total);
        //render the avg to show on client side//
        res.render('index',{reviewAVG: total});
      }
      else{
        res.render('index',{reviewAVG: undefined});
      }
    });
});

app.post('/', function(req,res){
  console.log("post to database called");
  var rating = req.body.rating;
  rating = parseInt(rating);
  req.db.collection("starRate").insertOne({'rating': rating}, function(err, result){
    if (err) throw err;
    console.log("1 review inserted");
    res.redirect('/');
  });
});

if (require.main === module) {
    app.listen(config.port, function() {
        console.log("Local server started");
    });
}

module.exports = app;
