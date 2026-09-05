const mongoose = require('mongoose');
require('dotenv').config();

// define the mongoDB url
const mongoURL = 'mongodb://localhost:27017/hotels';
// const mongoURL = process.env.DB_URL;
// setup mongoDB connection.
mongoose.connect(mongoURL);

// get the default connection.
// mongoose maintains a default connection object represnting the mongoDB connection.
const db = mongoose.connection;

// define event litseners for database connection
db.on('connected', () => {
    console.log("connected to mongoDB server.");
});

db.on('disconnected', () => {
    console.log("mongoDB connection error.");
});

db.on('error', () => {
    console.log("mongoDB disconnected");
});
//
// exports the database connection to the server file.
module.exports = db;