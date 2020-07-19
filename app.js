var ex = require("express");
var ej = require("ejs");
var mongoose = require("mongoose");
var app = ex();
var bP = require("body-parser"); 
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");
var port = process.env.PORT || 3000;
const request = require('request');

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