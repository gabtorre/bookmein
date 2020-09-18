
/* External mudules */
const express = require('express')
const router = express.Router()




// index routes

router.get('/company', (req, res)=>{
    res.send('making an appointment')
})





module.exports = router