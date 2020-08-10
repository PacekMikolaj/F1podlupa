var express = require("express")
var app = express();
var path = require("path")
var fs = require('fs');


app.use(express.static('static'))

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "static"));


app.get("/", function (req, res) {


    console.log("xd")
    res.sendFile(__dirname + "/static/index.html");

})



app.listen(3000, function () {
    console.log("f1")
})
