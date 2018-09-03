const express = require('express');
const router = express.Router();

// NEW
router.get('/new', (req, res, next) => {
  res.render('posts/new');
});

// CREATE
router.post('/new', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});



module.exports = router
