const express = require('express');
const router = express.Router();
const User = require('../models/user');

// SIGN UP FORM
router.get('/sign-up', (req, res) => {
    res.render('users/sign-up');
});

// SIGN UP POST
router.post('/sign-up', (req, res) => {
    // Create User
    const user = new User(req.body);
    user.save().then((user) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    });
});

// LOGIN FORM
router.get('/login', (req, res) => {

});

module.exports = router
