const router = require('express').Router();
const Article = require('../static/models/article');
const F1team = require('../static/models/f1team');
const F1driver = require('../static/models/f1driver');
const path = require('path');
const express = require("express");


require("dotenv").config();


router.use(express.urlencoded({ extended: false }));
router.use(express.json());

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
    data.f1teams = await F1team.find();
    
    data.articlesSliderA = await Article.find({ "section": { $ne: "f1" } }).limit(4).sort({ ID: -1 }).exec();
    data.articlesSliderB = await Article.find({ "section": "f1" }).limit(4).sort({ ID: -1 }).exec();
    data.articles = data.articlesSliderA.concat(data.articlesSliderB);
    data.articles = data.articles.sort( (a,b) => a.ID < b.ID ? 1 : -1 );

    res.render("f1/teams", data);

})

router.get('/drivers', async (req, res) => {

    let data = {};
    data.f1drivers = await F1driver.find();
    
    data.articlesSliderA = await Article.find({ "section": { $ne: "f1" } }).limit(4).sort({ ID: -1 }).exec();
    data.articlesSliderB = await Article.find({ "section": "f1" }).limit(4).sort({ ID: -1 }).exec();
    data.articles = data.articlesSliderA.concat(data.articlesSliderB);
    data.articles = data.articles.sort( (a,b) => a.ID < b.ID ? 1 : -1 );

    res.render("f1/drivers", data);

})

// router.get('/tory', (req, res) => {

//     let data = {}
//     data.articlesF1 = await Article.find({ "section": "f1" }).sort({ _id: -1 }).exec();
//     data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ _id: -1 }).exec();

//     res.render("f1", data);

// })



module.exports = router;
