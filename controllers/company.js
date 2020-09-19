
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


// Edit Route

router.get('/:id/edit', (req, res)=>{
    db.Company.findById(req.params.id, (error, foundCompany)=>{
        if(error){
            return res.send(error)
        }else{
            const context = {company: foundCompany}
            res.render('edit.ejs' , context)
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
    db.Company.findByIdAndDelete(rew.params.id, (error, companyDeleted)=>{
        if(error){
            return res.send(error)
        }else{
            res.redirect('/company')
        }
    })
})


module.exports = router