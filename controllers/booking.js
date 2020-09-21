/* External mudules */
const express = require('express');
const router = express.Router();
const db  = require('../models');



// An array of Days
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']



// Index Route
router.get('/', (req, res)=>{
    
    db.Booking.find({}, (error , foundbookings)=>{
        if(error){
            return res.send(error)
        }else{
          const context = {bookings: foundbookings}
           
          res.render('./booking/index.ejs', context)
     
         
  
        }
    } )  
  })



// New Route
router.get('/new', async (req, res) => {
    try {
        const fondCompany = await db.Company.find({});
        const foundUser = await db.User.find({});

        res.render('./booking/new.ejs', {
            company: fondCompany,
            user: foundUser,
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
    const foundUser = await db.User.findById(req.body.user)

    createdADay.user  = foundUser;

    foundCompany.bookings.push(createdADay);
    await foundCompany.save();
    res.redirect('/booking');
        
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});



// Show Route
router.get('/:id', (req, res)=>{

    db.Booking.findById(req.params.id, (error, foundBooking)=>{
        if(error){
            return res.send(error)
        }else{
            const context = {booking: foundBooking}
            res.render('./booking/show.ejs', context)
        }
    })
});



// Edit Route
router.get('/:id/edit', (req, res)=>{
    db.Booking.findById(req.params.id, (error, foundBooking)=>{
        if(error){
            return res.send(error)
        }else{
            const context = {booking: foundBooking}
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



// Delete Route
router.delete('/:id', (req , res)=>{
    db.Booking.findByIdAndDelete(req.params.id, (error, deletedBooking)=>{
        if(error){
            return res.send(error)
        }else{
            res.redirect('/booking')
        }
    })
})



module.exports = router;