// External Modules
const express = require('express');
const methodOverride = require("method-override");
const path = require('path');

// Interal Modules
const controllers = require('./controllers')
const db = require('./models')

// Instanced Modules
const app = express();

// Configuration
const PORT = 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// ROUTES

// View Route
app.get('/', (req, res) => {
    res.render('home.ejs')
});

// Company Route
app.use('/company', controllers.company);

// User Route
app.use('/user', controllers.user);

// Booking Route
app.use('/booking', controllers.booking);


// Server Listener
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))


