
/* External mudules */
const express = require('express')
const router = express.Router()
const db  = require('../models')





// Index Route
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


// New Route
router.get('/new', (req, res)=>{
    res.render('new.ejs')
 
  })



// Post Route
router.post('/' , (req, res)=>{
    db.Company.create(req.body, (error, companyCreated)=>{
        if(error){
        return res.send(error)
        }else{
            res.redirect('/company')
        }
    })
})


// Show Route

router.get('/:id', (req, res)=>{

    db.Company.findById(req.params.id, (error, foundCompany)=>{
        if(error){
            return res.send(error)
        }else{
            const context = {company: foundCompany}
            res.render('show.ejs', context)
        }
    })
})




module.exports = router