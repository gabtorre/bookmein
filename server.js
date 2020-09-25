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
require('dotenv')

//add role to company in company Schema

// Configuration
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));




// creates the session id on server side 
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: process.env.SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI
    }),
    cookie:{
    maxAge:1000 * 60 * 60 * 24 * 7 * 2
    }
  }))


// validates if user logs in 
const authRequired = function(req, res , next){
//console.log(req.session.currentUser.id)
  if(!req.session.currentUser){
  return res.redirect('/login')
}
next();
};

// middleware to add user to all ejs views
app.use(function (req, res, next) {
res.locals.user = req.session.currentUser; // adds the user to all ejs views
res.locals.isAdmin = false;
next();
});

const checkRole = async (req, res, next) => {
  try {
    if (req.session.currentUser){
    
    if (req.session.currentUser.role == 'admin') {
      res.locals.isAdmin = true;
      } 
    }
  next();
    
  } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
  }
};

// ROUTES

// View Route
app.get('/', checkRole, async (req, res) => {
  try {
    const foundCompanies = await db.Company.find({});
    
    const context = {
      companies: foundCompanies,
    };
    res.render('home.ejs', context);
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
});


// Auth Routes
app.use('/', controllers.auth)


// Company Route
app.use('/company', checkRole, controllers.company);

// User Route
app.use('/user', controllers.user);

// Booking Route
app.use('/booking', checkRole, controllers.booking);


// Server Listener
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))


