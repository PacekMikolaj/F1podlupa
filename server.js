const express = require("express")
const app = express();
const path = require("path")
const bodyParser = require("body-parser");
const connectDB = require('./connection');


require('dotenv').config();

const port = process.env.PORT || 3000;

connectDB();

//Import Routes
const admin = require('./routes/admin');

//Route Middleware
app.use('/admin' , admin);


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


app.listen(port, function () {
    console.log("f1podlupa startuje na porcie " + port);
})

