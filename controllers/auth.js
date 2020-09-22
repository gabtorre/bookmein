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



// Login Post 
router.post("/login", async (req, res)=> {
   
    try {
         // checks if user already exists 
        const foundUser = await db.User.findOne({ email: req.body.email });
        //if user does exist, send back an error
        if(!foundUser) {
            return res.send({ message: "Email or Password incorrect" });
        }

        // return true or false if db password and entered password matched or not
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        // no password matched , sends error
        if(!match) {
            return res.send({ message: "Email or Password incorrect" });
        }
        
        // if password match, create sesssion for authentication
        req.session.currentUser = {
            username: foundUser.username,
            id: foundUser._id,
        }
    res.redirect("/")
    } catch (error) {
        res.send({ message: "Internal Server Error", err: error });
    }
})




module.exports = router;