const express = requre('express');
const router = expressRouter();

const db = require('../models');


// Index Route
router.get('/', (req, res) => {
    res.render("User Index")
});


// New Route
router.get('/new', (req, res) => {
    res.render('User New')
});


// Create Route
router.post('/', (req, res) => {
    res.render('Post User')
});


// Show Route
router.get('/:id', (res, render) => {
    res.render('User Index')
});


// Edit Route
router.get('/:id/edit', (res, render) => {
    res.render('Edit User')
});


// Update Route
router.put('/:id', (req, res) => {
    res.render('Update User')
});


// Delete Route
router.delete('/:id', (req, res) => {
    res.render('User Delete')
});

module.exports = router;