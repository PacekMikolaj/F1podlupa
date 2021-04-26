const router = require('express').Router();
const Article = require('../static/models/article');
const path = require('path');
const bodyParser = require("body-parser");


require("dotenv").config();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let limit = 6;

let newest = 3;


router.get('/', paginatedResults(Article, limit, newest, "f1"), async (req, res) => {

    let data = {};

    if (res.paginationInfo.page == 1) {

        data.newest = await Article.find({ "section": "f1"}).sort({ ID: -1 }).limit(newest).exec();
    }

    data.articlesF1 = res.paginatedModels;
    data.paginationInfo = res.paginationInfo;
    data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ _id: -1 }).exec();

    res.render("f1/f1", data);

})

router.get('/teams', async (req, res) => {

    let data = {};
    //data.articlesF1 = await Article.find({ "section": "f1" }).sort({ _id: -1 }).exec();
    //data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ _id: -1 }).exec();

    res.render("f1/teams", data);

})

// router.get('/kierowcy', (req, res) => {

//     let data = {}
//     data.articlesF1 = await Article.find({ "section": "f1" }).sort({ _id: -1 }).exec();
//     data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ _id: -1 }).exec();

//     res.render("f1", data);

// })

// router.get('/tory', (req, res) => {

//     let data = {}
//     data.articlesF1 = await Article.find({ "section": "f1" }).sort({ _id: -1 }).exec();
//     data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ _id: -1 }).exec();

//     res.render("f1", data);

// })



module.exports = router;
