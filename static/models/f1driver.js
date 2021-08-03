let mongoose = require("mongoose");

let Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nation: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    previousTeams: [{
        type: String
    }],
    previousAchievement: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
    },
    podiums: {
        type: Number,
    },
    polePositions: {
        type: Number,
    },
    driverChampionships: {
        type: Number,
    },
    funFacts: [{
        type: String,
    }],
    photo: {
        type: String,
        required: true
    },
    photoSrc: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model("f1driver", Schema);