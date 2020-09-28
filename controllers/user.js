/* External mudules */
const express = require('express');
const router = express.Router();
const db = require('../models');
const session = require('express-session')



// User account Route
router.get('/:id/account', async (req, res) => {
    try {
        const foundUser = await db.User.findById(req.params.id);
        const foundBookings = await db.Booking.find({ 'user': req.params.id }).populate('company').exec();
        
        res.render('user/show.ejs', {
            foundUser: foundUser,
            bookings: foundBookings,
        })  
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});



// Edit Route
router.get('/:id/edit', (req, res) => {
    db.User.findById(req.params.id, (error, foundUser) => {
        if (error) {
            console.log(error)
        } else {
            res.render('user/edit.ejs', {
                foundUser: foundUser
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
            res.redirect(`/user/${updatedUser._id}/account`)
        }
    })
});



// Delete Route - Deletes from db and destroys session
router.delete('/:id', async (req, res) => {
    try {
        await db.User.findByIdAndDelete(req.params.id);
        await req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
});



module.exports = router;