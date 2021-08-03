const router = require('express').Router();
const Article = require('../static/models/article');
const Data = require('../static/models/data');
const Car = require('../static/models/car');
const path = require('path');
const express = require("express");
const car = require('../static/models/car');
const { carInfoChange } = require('../static/js/carInfoChange');


require("dotenv").config();


router.use(express.urlencoded({ extended: false }));
router.use(express.json());

let limit = 6;

let newest = 3;


router.get("/", paginatedResults(Article, limit, newest, "f2"), async function (req, res) {

    let data = {};
    if (res.paginationInfo.page == 1) {
        data.newest = await Article.find({ "section": "f2" }).sort({ ID: -1 }).limit(newest).exec();
    }

    data.car = await Car.find({ "type": "f2" });
    data.car = data.car[0]; //zmiana z tab na pojedynczy elem

    data.car.informations = carInfoChange(data.car.info);

    data.articlesF2 = res.paginatedModels;
    data.paginationInfo = res.paginationInfo;

    res.render("f2/f2", data);

})

router.get('/teams', async (req, res) => {

    let data = {};

    data.articlesSliderA = await Article.find({ "section": { $ne: "f2" } }).limit(4).sort({ ID: -1 }).exec();
    data.articlesSliderB = await Article.find({ "section": "f2" }).limit(4).sort({ ID: -1 }).exec();

    data.articles = data.articlesSliderA.concat(data.articlesSliderB);
    data.articles = data.articles.sort((a, b) => a.ID < b.ID ? 1 : -1);

    data.data = await Data.find({ "type": "f2team" });
    res.render("f2/teams", data);

})


router.get('/drivers', async (req, res) => {

    let data = {};

    data.articlesSliderA = await Article.find({ "section": { $ne: "f2" } }).limit(4).sort({ ID: -1 }).exec();
    data.articlesSliderB = await Article.find({ "section": "f2" }).limit(4).sort({ ID: -1 }).exec();

    data.articles = data.articlesSliderA.concat(data.articlesSliderB);
    data.articles = data.articles.sort((a, b) => a.ID < b.ID ? 1 : -1);

    data.data = await Data.find({ "type": "f2driver" });
    res.render("f2/drivers", data);

})


module.exports = router;
