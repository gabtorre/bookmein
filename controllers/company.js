
/* External mudules */
const express = require('express')
const router = express.Router()
const db  = require('../models')





// index routes

router.get('/', (req, res)=>{
    
  db.Company.find({}, (error , foundCompanies)=>{
      if(error){
          return res.send(error)
      }else{
        const context = {companies: foundCompanies}
         
        res.render('index.ejs', context)
       

      }
  } )  
})





module.exports = router