const mongoose = require('mongoose');
require('dotenv').config();


const URI = process.env.URI;


const connectDB = async () => {
    await mongoose.connect( URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to database.")
}

module.exports = connectDB;
