
/* External mudules */
const express = require('express')
const router = express.Router()




// index routes

router.get('/', (req, res)=>{
    res.send('making an appointment')
})





module.exports = router