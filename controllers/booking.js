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



// Show Route
router.get('/:id', authRequired, async (req, res) => {
    try {
        const foundBooking = await db.Booking.findById(req.params.id);
        res.render('./booking/show.ejs', {
            booking: foundBooking
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
            const context = {
                booking: foundBooking,
                }
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
            res.redirect(`/booking/${req.params.id}`)
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
    res.redirect(`/user/${req.session.currentUser.id}/account`);   
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
            res.redirect(`/company/${req.session.currentUser.id}`)
        }
    })
})



module.exports = router;