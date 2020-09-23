/* External mudules */
const express = require('express');
const router = express.Router();
const db  = require('../models');
const session = require('express-session')



// validates if user logs in 
const authRequired = function(req, res , next){
    if(!req.session.currentUser){
     return res.redirect('/login')
   }
   next();
   };



// An array of Days ,  fullMonths , months
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];



// Index Route
router.get('/', async (req, res) => {
    try {
        const foundBookings = await db.Booking.find({}).populate('company').exec();
        const context = {
            bookings: foundBookings,
            user: req.session.currentUser,
            days: days,
            months: months,
            fullMonths: fullMonths
        }
        res.render('./booking/index.ejs', context);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
  })



// New Route
router.get('/new', authRequired, async (req, res) => {
    try {
        const fondCompany = await db.Company.find({});
        //const foundUser = await db.User.find({});

        res.render('./booking/new.ejs', {
            company: fondCompany,
            user: req.session.currentUser// session current user after login 
          
        });
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
  });



// Post Route
router.post('/' , async (req, res)=>{
    try {
    // takes a date and asigns it 
    //let day = new Date(req.body.day)
    // asigns a day to req.body.day from days array
    //req.body.day = days[day.getDay()]

    const createdADay = await db.Booking.create(req.body);
    const foundCompany = await db.Company.findById(req.body.company);
    //const foundUser = await db.User.findById(req.body.user)

    //createdADay.user  = foundUser;

    //foundUser.bookings.push(createdADay);
    //await foundUser.save();

    foundCompany.bookings.push(createdADay);
    await foundCompany.save();
    res.redirect('/booking');
        
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});



// Show Route
router.get('/:id', authRequired, async (req, res) => {
    try {
        const foundBooking = await db.Booking.findById(req.params.id);
        res.render('./booking/show.ejs', {
            booking: foundBooking,
            user: req.session.currentUser, // session current user after login 
        })
        
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});




// Edit Route
router.get('/:id/edit', authRequired, (req, res)=>{
    db.Booking.findById(req.params.id, (error, foundBooking)=>{
        if(error){
            return res.send(error)
        }else{
            const context = {booking: foundBooking,
               
                // session current user after login  
                user: req.session.currentUser}
            res.render('./booking/edit.ejs' , context)
        }
    })
})



// Put Route 
router.put('/:id', (req, res)=>{

// takes a date and asigns it 
let day = new Date(req.body.day)

// asigns a day to req.body.day from days array
req.body.day = days[day.getDay()]

    db.Booking.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, bookingUpdated)=>{
        if(error){
           return res.send(error)
        }else{
            res.redirect('/booking')
        }
    })
})

// Put Route to update Booking
router.put('/:id/join' , async (req, res)=>{
    try {

    const bookingToJoin = await db.Booking.findById(req.params.id)

    const userId = req.body.user;

    bookingToJoin.user = req.session.currentUser.id;

    await bookingToJoin.save();

    res.redirect('/booking');
        
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});


// Delete Route
router.delete('/:id', authRequired, (req , res)=>{
    db.Booking.findByIdAndDelete(req.params.id, (error, deletedBooking)=>{
        if(error){
            return res.send(error)
        }else{
            res.redirect('/booking')
        }
    })
})



module.exports = router;