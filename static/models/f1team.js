let mongoose = require("mongoose");

let f1Schema = mongoose.Schema({
    teamLogo: {
        type: String,
        required: true
    },
    teamLogoSrc: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true

    },
    nation: {
        type: String,
        required: true
    },
    home: {
        type: String,
        required: true
    },
    driverA: {
        type: String,
        required: true

    },
    driverB: {
        type: String,
        required: true

    },
    thirdDrivers: [{
        type: String,
        required: true
    }],
    boss: {
        type: String,
    },
    others: [{
        type: String,
        required: true
    }],
    engine: {
        type: String,
        required: true

    },
    beforeAs: [{
        type: String,
        required: true
    }],

    debut: {
        type: String,
        required: true

    },
    teamPhoto: {
        type: String,
        required: true

    },
    teamPhotoSrc: {
        type: String,
        required: true

    },
    constructorChampionships: {
        type: Number,
        required: true

    },
    wins: {
        type: Number,
        required: true

    },
    podiums: {
        type: Number,
        required: true

    },
    polePositions: {
        type: Number,
        required: true

    },

});

module.exports = mongoose.model("f1team", f1Schema);