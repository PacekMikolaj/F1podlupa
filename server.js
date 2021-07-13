const express = require("express");
const app = express();
const path = require("path");
const connectDB = require('./connection');
const { paginatedResults } = require('./middleware/paginatedResults');
const Article = require("./static/models/article");


const port = process.env.PORT || 3000;



require('dotenv').config();


connectDB();

//Import Routes
const admin = require('./routes/admin');
const f1Route = require('./routes/f1Route');
const f2Route = require('./routes/f2Route');
const RXroute = require('./routes/RXRoute');



//Route Middleware
app.use('/admin', admin);
app.use('/f1', f1Route);
app.use('/f2', f2Route);
app.use('/rallycross', RXroute);



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('static'));
app.set("views", path.join(__dirname, "static/views"));
app.set("view engine", "pug");

let limit = 6;

let newest = 3;

app.get("/", paginatedResults(Article, limit, newest), async function (req, res) {

    let data = {};

    if (res.paginationInfo.page == 1) {
        data.newest = await Article.find().sort({ ID: -1 }).limit(newest).exec();
    }

    data.articles = res.paginatedModels;
    data.paginationInfo = res.paginationInfo;


    res.render("index", data);

})


// app.get("/f1", async function (req, res) {

//     let data = {}
//     data.articlesF1 = await Article.find({ "section": "f1" }).sort({ ID: -1 }).exec();
//     data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ ID: -1 }).exec();

//     res.render("f1", data);
// })

// app.get("/f2", paginatedResults(Article, limit, newest, "f2"), async function (req, res) {

//     let data = {};
//     data.newest = await Article.find({ "section": "f2" }).sort({ ID: -1 }).limit(newest).exec();
//     data.articlesF2 = res.paginatedModels;
//     //data.newest = await Article.find().sort({ ID: -1 }).limit(newest).exec();
//     //data.articlesF2 = await Article.find({ "section": "f2" }).sort({ ID: -1 }).exec();
//     //data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ ID: -1 }).exec();

//     res.render("f2/f2", data);
// })

app.get("/article/:ID", async function (req, res) {

    let data = {};


    data.article = await Article.findOne({ "ID": req.params.ID }).sort({ ID: -1 }).exec();

    data.articlesSliderA = await Article.find({ $and: [{ "ID": { $ne: req.params.ID } }, { "section": { $ne: data.article.section } }] }).limit(4).sort({ ID: -1 }).exec();

    data.articlesSliderB = await Article.find({ $and: [{ "ID": { $ne: req.params.ID } }, { "section": data.article.section }] }).limit(4).sort({ ID: -1 }).exec();

    data.articles = data.articlesSliderA.concat(data.articlesSliderB);
    data.articles = data.articles.sort((a, b) => a.ID < b.ID ? 1 : -1);

    res.render("article", data);

})

app.get('/aboutUs', async (req, res) => {
    res.render('aboutUs');
})

app.get('/fE', async (req, res) => {
    res.render('fE');
})


app.get('/otherSeries', async (req, res) => {
    res.render('otherSeries');
})


app.listen(port, function () {
    console.log("f1podlupa startuje na porcie " + port);
})
