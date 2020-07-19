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
//connect defined db to mongoose
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url, {useNewUrlParser: true});
var fortunesSchema = new mongoose.Schema({
    id: String,
    fortune: String
});
var fortunesList = mongoose.model("allfortunes",fortunesSchema);
fortunesList.insertMany({fort:"A friend's frown is better than a fool's smile."});



app.use(bP.urlencoded({extended: true}));
app.use(ex.static("public"));
app.use(methodOverride("_method"));
app.use(sanitizer());
app.get("/", function (req, res) {
    res.render("index.ejs");
});
app.listen(port, function () {
    console.log("Server is running");
  });