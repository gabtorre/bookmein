
/* External mudules */
const express = require('express')
const router = express.Router()
const db  = require('../models')




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
router.get('/new', (req, res)=>{
    res.render('./booking/new.ejs')
 
  })


  // Post Route
router.post('/' , (req, res)=>{
    
    // defines an array of days
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

 // takes a date and asigns it 
let day = new Date(req.body.day)

// asigns a day to req.body.day 
req.body.day = days[day.getDay()]

db.Booking.create(req.body, (error, createdADay)=>{ 
        if(error){
            return res.send(error)
        }else{
            res.redirect('/booking')
        }
    })
})




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
})




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





  module.exports = router