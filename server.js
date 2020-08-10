const express = require("express")
const app = express();
const path = require("path")
var fs = require('fs');
const bodyParser = require("body-parser");
var formidable = require('formidable');

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nodekb");

let db = mongoose.connection;

db.once("open", function () {
    console.log("connected to database.");
});

db.on("error", function (err) {
    console.log(err);
});

let Article = require("./static/models/article");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use(express.static('static'))

app.set("views", path.join(__dirname, "static/views"));

app.set("view engine", "pug");



app.get("/", function (req, res) {

    Article.find({}, function (err, articles) {
        if (err) { console.log(err) } else {

            let l = articles.length - 1;
            let data = { articles: [ articles[l - 0], articles[l - 1], articles[l - 2], articles[l - 3], articles[l - 4], articles[l - 5], articles[l - 6], articles[l - 7] ] };
           // console.log(data)

            res.render("index", data);

        }
    });
})


app.get("/f1", function (req, res) {

    Article.find({"section": "f1"}, function (err, articles) {
        if (err) { console.log(err) } else {

            let l = articles.length - 1;
            let data = { articles: [ articles[l - 0], articles[l - 1], articles[l - 2] ] };
           // console.log(data)

            res.render("f1", data);

        }
    });

})


app.get("/article/:ID", function (req, res) {

    console.log(req.params)

    let data;

    Article.find({ "ID": { $ne: req.params.ID }}, function (err, articles) {
        if (err) { console.log(err) } else {

            let l = articles.length - 1;
            data = { articles: [ articles[l - 0], articles[l - 1], articles[l - 2], articles[l - 3] ] };

        }
    });


    Article.find({ "ID": req.params.ID }, function (err, articles) {
        if (err) { console.log(err) } else {

            data.article = articles[0];
            res.render("article", data);

        }

    });


})

app.get("/add", function (req, res) {

    res.render("add_article");
})


app.post("/articles/add", function (req, res) {

    var form = new formidable.IncomingForm();

    let id = Date.now();

    let date = new Date();

    let minuty;

    if (date.getMinutes() < 10) {
        minuty = "0" + date.getMinutes();
    } else { minuty = date.getMinutes(); }

    form.keepExtensions = true;

    form.uploadDir = __dirname + '/static/upload/';

    form.parse(req, function (err, fields, files) {

        console.log('PARSE')

        let article = new Article();

        article.title = fields.title;
        article.author = fields.author;
        article.body = fields.body;
        article.short = fields.short;
        article.section = fields.section;
        article.date = date.getHours() + ":" + minuty + " " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
        article.ID = id;

        article.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }
        })

        console.log(fields);
    });

    form.on('file', function (field, file) {

        console.log("FILE")

        fs.mkdirSync(form.uploadDir + `${id}/`);

        let ext = file.name.split(".")[1];

        fs.rename(file.path, form.uploadDir + `${id}/cover.${ext}`, function (err) {
            if (err) console.log(err)
        });

    });

    res.redirect("/add");


})



app.listen(3000, function () {
    console.log("f1")
})