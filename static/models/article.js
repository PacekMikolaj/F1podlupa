let mongoose = require("mongoose");

let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    short: {
        type: String,
        required: true

    },

    author: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    section: {
        type: String,
        required: true
    },

    moreSections: {
        type: [String],
        required: false
    },

    ID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Article", articleSchema );