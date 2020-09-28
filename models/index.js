// MODELS AND DATABASE CONNECTION

const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/main-db';


mongoose.connect(connectionString,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    });


mongoose.connection.on('connected', () => {
    console.log(`mongoose connected to ${connectionString}`)
});


mongoose.connection.on('disconnected', () => {
    console.log(`mongoose disconnected`)
});


mongoose.connection.on('error', () => {
    console.log(`mongoose error: ${error}`)
});

module.exports = {
    Company: require('./Company.js'),
    User: require('./User.js'),
    Booking: require('./Booking.js')

}