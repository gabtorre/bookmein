// External Modules
const express = require('express');
const methodOverride = require("method-override");
const path = require('path');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// Interal Modules
const controllers = require('./controllers')
const db = require('./models')

// Instanced Modules
const app = express();

//add role to company in company Schema

// Configuration
const PORT = 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));




// creates the session id on server side 
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: "gabrielllbinayyy",
    store: new MongoStore({
      url: 'mongodb://localhost:27017/bookme-sessions'
    }),
    cookie:{
    maxAge:1000 * 60 * 60 * 24 * 7 * 2
    }
  }))


// validates if user logs in 
  const authRequired = function(req, res , next){
    console.log(req.session.currentUser.id)
     if(!req.session.currentUser){
      return res.redirect('/login')
    }
    next();
    };

// ROUTES

// View Route
app.get('/', (req, res) => {
    res.render('home.ejs', {user: req.session.currentUser})
});


// Auth Routes
app.use('/', controllers.auth)


// Company Route
app.use('/company', authRequired, controllers.company);

// User Route
app.use('/user', controllers.user);

// Booking Route
app.use('/booking', controllers.booking);


// Server Listener
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))


