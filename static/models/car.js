let mongoose = require("mongoose");

let Schema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    info: [{
        type: String,
        required: true
    }],
    ps: {
        type: [ String ]
    },
    specification: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("car", Schema);