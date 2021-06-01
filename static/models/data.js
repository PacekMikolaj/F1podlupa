let mongoose = require("mongoose");

let dataSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },

    nation: {
        type: String,
    },

    achievements: {
        type: String,
    },

    photo: {
        type: String,
    },

    src: {
        type: String,
    },

    age: {
        type: String,
    },

    team: {

        type: String,
    }

});

module.exports = mongoose.model("data", dataSchema );