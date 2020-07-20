var ex = require("express");
var ej = require("ejs");
var mongoose = require("mongoose");
var app = ex();
var bP = require("body-parser"); 
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");
var port = process.env.PORT || 3000;
const request = require('request');
const url = 'mongodb://127.0.0.1:27017/fortunesdb';
const lineReader = require('line-reader');
var firstTime;
var forts = [];
var x=0;
var fortuneTotal;
var randValue;
var editMode=0;
//connect defined db to mongoose
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url, {useNewUrlParser: true});
var fortunesSchema = new mongoose.Schema({
    id: String,
    fort: String
});
var fortunesList = mongoose.model("allfortunes",fortunesSchema);


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
  fortunesList.find({}, function(err, flist){
    if(err){
      console.log(err);
    }
    else
    {
      firstTime = 0;
      x=0;
      flist.forEach(function(flist){
        forts[x]=flist.fort;
        x++;
      });
      fortuneTotal = forts.length;
      randValue = Math.floor(Math.random() * fortuneTotal);
      console.log(forts[randValue]);
      res.redirect("/");
    }
  });
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