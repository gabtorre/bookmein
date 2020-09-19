
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


  module.exports = router