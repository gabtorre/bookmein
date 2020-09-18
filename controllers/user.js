const express = require('express');
const router = express.Router();

const db = require('../models');


// Index Route
router.get('/', (req, res) => {
    res.send("User Index")
});


// New Route
router.get('/new', (req, res) => {
    res.send('User New')
});


// Create Route
router.post('/', (req, res) => {
    res.send('Post User')
});


// Show Route
router.get('/:id', (req, res) => {
    res.send('User Index')
});


// Edit Route
router.get('/:id/edit', (req, res) => {
    res.send('Edit User')
});


// Update Route
router.put('/:id', (req, res) => {
    res.send('Update User')
});


// Delete Route
router.delete('/:id', (req, res) => {
    res.send('User Delete')
});

module.exports = router;