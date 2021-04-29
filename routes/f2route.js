const router = require('express').Router();
const Article = require('../static/models/article');
const path = require('path');
const express = require("express");


require("dotenv").config();


router.use(express.urlencoded({ extended: false }));
router.use(express.json());

let limit = 6;

let newest = 3;


router.get("/", paginatedResults(Article, limit, newest, "f2"), async function (req, res) {

    let data = {};
    if(res.paginationInfo.page == 1)
    {
        data.newest = await Article.find({ "section": "f2"}).sort({ ID: -1 }).limit(newest).exec();
    }

    data.articlesF2 = res.paginatedModels;
    data.paginationInfo = res.paginationInfo;

    res.render("f2/f2", data);


})

router.get('/teams', async (req, res) => {

    let data = {};
    data.articles = await Article.find({ "ID": { $ne: req.params.ID } }).limit(4).sort({ ID: -1 }).exec();

    res.render("f2/teams", data);

})


router.get('/drivers', async (req, res) => {

    let data = {};
    data.articles = await Article.find({ "ID": { $ne: req.params.ID } }).limit(4).sort({ ID: -1 }).exec();

    res.render("f2/drivers", data);

})


module.exports = router;
