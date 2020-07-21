var ex = require("express");
var ej = require("ejs");
var mongoose = require("mongoose");
var app = ex();
var bP = require("body-parser"); 
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");
var port = process.env.PORT || 3000;
const request = require('request');
var firstTime;
var forts = [];
var x=0;
var fortuneTotal;
var randValue;
var editMode=0;
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
//connect defined db to mongoose
const uri ="mongodb+srv://janmichaeljose:2VXgJc8DqskpqmR@mongodbs.jxnfl.gcp.mongodb.net/fortunesDB?retryWrites=true&w=majority"
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, {useNewUrlParser: true});
var fortunesSchema = new mongoose.Schema({
    id: String,
    fortune: String
});
var fortunesList = mongoose.model("fortunes",fortunesSchema);
app.use(bP.urlencoded({extended: true}));
app.use(ex.static("public"));
app.use(methodOverride("_method"));
app.use(sanitizer());
app.get("/", function (req, res) {
    if (firstTime==1)
    {
      res.render("index.ejs",{firstTime:firstTime, editMode:0});
    }
    else
    {
      res.render("index.ejs",{randFortune: forts[randValue], firstTime:firstTime, editMode:0});
    }

  });
app.get("/getfortune", function (req, res){
  firstTime = 0;
  x=0;
  fortunesList.find({}, function(err, flist){
    if(err){
      console.log(err);
    }
    else
    {
      flist.forEach(function(data){
        forts[x]=data.fortune;
        x++;        
      })
    }
  });
  fortuneTotal = forts.length;
  console.log(fortuneTotal);
  randValue = Math.floor(Math.random() * fortuneTotal);
  console.log(forts[randValue]);
  res.redirect("/");

});
app.get("/adminpage", function (req, res){
  fortunesList.find({}, function(err, flist){
    if(err){
      console.log(err);
    }
    else
    {
      res.render("admin.ejs",{fortunes:flist});
    }
  });
});
app.listen(port, function () {
    
    console.log("Server is running");
  });