// MODELS AND DATABASE CONNECTION

const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/fruits-db';


mongoose.connect(connectionString,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
    Model: require('./Model.js')
}