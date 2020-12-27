const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require('./connection');
const { paginatedResults } = require('./middleware/paginatedResults');


const port = process.env.PORT || 3000;

let Article = require("./static/models/article");


require('dotenv').config();


connectDB();

//Import Routes
const admin = require('./routes/admin');

//Route Middleware
app.use('/admin', admin);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.set("views", path.join(__dirname, "static/views"));
app.set("view engine", "pug");

let limit = 6;

let newest = 3;

app.get("/", paginatedResults(Article, limit, newest), async function (req, res) {

    let data = {};

    if(res.paginationInfo.page == 1)
    {
        data.newest = await Article.find().sort({ _id: -1 }).limit(newest).exec();
    }

    data.articles = res.paginatedModels;
    data.paginationInfo = res.paginationInfo;


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


app.listen(port, function () {
    console.log("f1podlupa startuje na porcie " + port);
})
