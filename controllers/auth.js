const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');


// Render the signup form
router.get('/sign-up', (req, res) => {
  res.render('users/sign-up');
});


// POST: creates a new user
router.post('/sign-up', (req, res) => {
  // CREATE User and JWT
  const user = new User(req.body);

  user.save().then( user => {
    let token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
    console.log(req.cookies);
  }).catch( err => {
    console.log(err.message);
    return res.status(400).send({ err: err });
  })
});

// LOGIN FORM
router.get('/login', (req, res) => {
  res.render('users/login');
});

// LOGIN USER
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Look for this user name
  User.findOne({ username }, 'username password')
    .then(user => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }

      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(401).send({ message: 'Wrong Username or Password' });
        }

        // Create the token
        const token = jwt.sign(
          { _id: user._id, username: user.username }, process.env.SECRET,
          { expiresIn: '60 days' }
        );
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      });
    })
    .catch(err => {
      console.log(err.message)
    })
});

// LOGOUT
router.get('/logout', (req, res) => {
  res.clearCookie('nToken');
  res.redirect('/');
});

module.exports = router;
