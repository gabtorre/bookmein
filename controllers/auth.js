const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");


// register form
router.get("/register", function(req, res) {
    res.render("auth/register.ejs");
});


// register post
router.post("/register", async (req, res)=>{
    try {
        // search db to see if user already exists 
        const foundUser = await db.User.findOne({ email: req.body.email });
        // if a user is found, send back an error
        if(foundUser) {
            return res.send({ message: "Account is already registered" });
        }
        // if no user is found, hash password
       
        const salt = await bcrypt.genSalt(10);

        // takes each character and turns it into multiple random characters
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        // create user with req.body and hashed password
        await db.User.create(req.body);

        // redirect to login
        res.redirect("/");
    } catch (error) {
        res.send({ message: "Internal Server Error", err: error });
    }
});


module.exports = router;