const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");


// Register Form
router.get("/register", (req, res)=>{
    res.render("auth/register.ejs");
});


//Register Post
router.post("/register", async (req, res)=>{
    try {
        // checks if user already exists 
        const foundUser = await db.User.findOne({ email: req.body.email });
        
        //if user exists, send back an error
        if(foundUser) {
            return res.send({ message: "Account is already registered" });
        }
       
        // if does not exist, hash password
        const salt = await bcrypt.genSalt(10);

        // generates multiple random characters from plain text
        const hash = await bcrypt.hash(req.body.password, salt);
        
        req.body.password = hash;

    // creates user with req.body and hashed password
        await db.User.create(req.body);

        //redirects to login
        res.redirect("/login");
    } catch (error) {
        res.send({ message: "Internal Server Error", err: error });
    }
});



// Login Form
router.get("/login", (req, res)=>{
    res.render("auth/login.ejs");
});




module.exports = router;