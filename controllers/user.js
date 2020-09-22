/* External mudules */
const express = require('express');
const router = express.Router();
const db = require('../models');
const session = require('express-session')



// Index Route
router.get('/', (req, res) => {
    db.User.find({}, (error, foundUsers) => {
        if (error) {
            console.log(error)
        } else {
            res.render('user/index.ejs', {
                user: req.session.currentUser,// session current user after login 
                user: foundUsers
            })
        }
    })
});



// New Route
router.get('/new', (req, res) => {
    res.render('user/new.ejs', {user: req.session.currentUser})
});



// Create Route
router.post('/', (req, res) => {
    db.User.create(req.body, (error, createdUser) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/user')
        }
    })
});



// Show Route
router.get('/:id', (req, res) => {
    db.User.findById(req.params.id, (error, foundUser) => {
        if (error) {
            console.log(error)
        } else {
            res.render('user/show.ejs', {
                user: req.session.currentUser,// session current user after login 
                user: foundUser
            })
        }
    })
});



// Edit Route
router.get('/:id/edit', (req, res) => {
    db.User.findById(req.params.id, (error, foundUser) => {
        if (error) {
            console.log(error)
        } else {
            res.render('user/edit.ejs', {
                user: req.session.currentUser,// session current user after login 
                user: foundUser
            })
        }
    })
});



// Update Route
router.put('/:id', (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedUser) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect(`/user/${updatedUser._id}`)
        }
    })
});



// Delete Route
router.delete('/:id', (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/user')
        }
    })
});



module.exports = router;