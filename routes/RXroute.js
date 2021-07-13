const router = require('express').Router();
const Article = require('../static/models/article');
const Data = require('../static/models/data');
const path = require('path');
const express = require("express");


require("dotenv").config();


router.use(express.urlencoded({ extended: false }));
router.use(express.json());

let limit = 6;

let newest = 3;


router.get("/", paginatedResults(Article, limit, newest, "rallycross"), async function (req, res) {

    let data = {};
    if(res.paginationInfo.page == 1)
    {
        data.newest = await Article.find({ "section": "f2"}).sort({ ID: -1 }).limit(newest).exec();
    }

    data.articlesF2 = res.paginatedModels;
    data.paginationInfo = res.paginationInfo;

    res.render("rallycross/rallycross", data);


})


module.exports = router;
