const express = require('express');
const router = express.Router();

const db = require('../models');


// Index Route
router.get('/', (req, res) => {
    db.User.find({}, (error, foundUsers) => {
        if (error) {
            console.log(error)
        } else {
            res.render('user/index.ejs', {
                user: foundUsers,
            })
        }
    })
});


// New Route
router.get('/new', (req, res) => {
    res.render('user/new.ejs')
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
                user: foundUser,
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
                user: foundUser,
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



module.exports = router;