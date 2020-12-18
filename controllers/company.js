/* External mudules */
const express = require('express');
const router = express.Router();
const db  = require('../models');
const bcrypt = require("bcryptjs");
const session = require('express-session')

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];



const authRequired = function(req, res , next){
    if(!req.session.currentUser){
     return res.redirect('/login')
   }
   next();
   };



// Index Route
router.get('/', async (req, res) => {
    try {
        const foundCompanies = await db.Company.find({});
        const context = {
            companies: foundCompanies,
        };
        res.render('./company/index.ejs', context);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
  });



// New Route
router.get('/new', (req, res)=>{
    res.render('./company/new.ejs')
  })



// Post Route
router.post('/' , async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if(foundUser) {
            return res.send({ message: "Account is already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const formData = {
            ...req.body,
            role: "admin"
        }

        await db.Company.create(formData)
        res.redirect('/company/login')
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})



// Login Form
router.get("/login", (req, res)=>{
    res.render("company/login.ejs");
});



// Login Post 
router.post("/login", async (req, res)=> {
    try {
         // checks if user already exists 
        const foundUser = await db.Company.findOne({ email: req.body.email });
       
        //if user does exist, send back an error
        if(!foundUser) {
            return res.send({ message: "Email or Password incorrect" });
        }

        // return true or false if db password and entered password matched or not
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        // no password matched , sends error
        if(!match) {
            return res.send({ message: "Email or Password incorrect" });
        }
        
        // if password match, create sesssion for authentication
        req.session.currentUser = {
            username: foundUser.username,
            id: foundUser._id,
            role: foundUser.role
        }
        
        res.redirect(`/company/${foundUser._id}/admin`)
       // }
    } catch (error) {
        res.send({ message: "Internal Server Error", err: error });
    }
})



// Show Route
router.get('/:id', async (req, res) => {
    try {
        const foundCompany = await db.Company.findById(req.params.id);
        const foundBookings = await db.Booking.find({'company': req.params.id})

        res.render('./company/show.ejs', {
            company: foundCompany,
            bookings: foundBookings,  
            days: days,
            months: months,
            fullMonths: fullMonths
        })
        
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});



// Admin Route
router.get('/:id/admin', async (req, res) => {
    try {
        const foundCompany = await db.Company.findById(req.params.id);
        const foundBookings = await db.Booking.find({ 'company': req.params.id }).populate('user').exec();

        res.render('./company/admin.ejs', {
            company: foundCompany,
            bookings: foundBookings, 
        })
        
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});



// New Booking Route
router.get('/:id/admin/new', async (req, res) => {
    const company = await db.Company.findById(req.params.id)
    try {
        res.render('./company/new-booking.ejs', {
            company: company,
        });
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
  });



// New Booking Post Route
router.post('/:id/admin' , async (req, res)=>{
    try {
    const createdADay = await db.Booking.create(req.body);
    const foundCompany = await db.Company.findById(req.params.id);

    foundCompany.bookings.push(createdADay);
    await foundCompany.save();
    res.redirect(`/company/${req.params.id}`);
        
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});

  

// Edit Route
router.get('/:id/edit', (req, res)=>{
    db.Company.findById(req.params.id, (error, foundCompany)=>{
        if(error){
            return res.send(error)
        }else{
            const context = {company: foundCompany}
            res.render('./company/edit.ejs' , context)
        }
    })
})



// Put Route 
router.put('/:id', (req, res)=>{
    db.Company.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, infoUpdated)=>{
        if(error){
           return res.send(error)
        }else{
            res.redirect(`/company/${infoUpdated._id}`)
        }
    })
})



// Delete Route
router.delete('/:id', (req , res)=>{
    db.Company.findByIdAndDelete(req.params.id, (error, companyDeleted)=>{
        if(error){
            return res.send(error)
        }else{
            res.redirect('/company')
        }
    })
})



module.exports = router;