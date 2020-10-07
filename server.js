const express = require("express")
const app = express();
const path = require("path")
var fs = require('fs');
const bodyParser = require("body-parser");
var formidable = require('formidable');
var sharp = require('sharp');

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/F1podlupa");

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


app.get("/", async function (req, res) {

    let data = {};
    let tmp = await Article.find({}).sort({ _id: -1 }).limit(10).exec();
    data.newest = tmp.slice(0, 4);
    data.articles = tmp.slice(4);

    res.render("index", data);

})


app.get("/f1", async function (req, res) {

    let data = {}
    data.articlesF1 = await Article.find({ "section": "f1" }).sort({ _id: -1 }).exec();
    data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ _id: -1 }).exec();

    res.render("f1", data);
})


app.get("/article/:ID", async function (req, res) {

    let data = {};
    data.articles = await Article.find({ "ID": { $ne: req.params.ID } }).limit(4).sort({ _id: -1 }).exec();
    data.article = await Article.find({ "ID": req.params.ID }).sort({ _id: -1 }).exec();
    data.article = data.article[0]; // changing from array to simple element

    res.render("article", data);

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
        article.date = date.getHours() + ":" + minuty + " " + date.getDate() + "." + (date.getMonth() + 1) % 12 + "." + date.getFullYear();
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

        let ext = file.name.split(".")[-1];

        fs.rename(file.path, form.uploadDir + `${id}/cover.${ext}`, function (err) {
            if (err) console.log(err)

            sharp(form.uploadDir + id + `/cover.${ext}`)
                .toFile(form.uploadDir + id + '/cover.webp')
                .then(data =>
                    fs.unlink(form.uploadDir + id + '/cover.undefined', (err) => {
                        if (err) throw err;
                    })
                )
                .catch(err => console.log(err))
        });

    });
    res.redirect("/add");
})


app.listen(3000, function () {
    console.log("f1")
})