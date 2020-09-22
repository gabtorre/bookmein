const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");


// register form
router.get("/register", function(req, res) {
    res.render("auth/register.ejs");
});