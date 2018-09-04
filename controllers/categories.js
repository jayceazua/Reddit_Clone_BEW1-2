const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Search through the Categories
router.get('/:category', (req, res) => {
  Post.find({ category: req.params.category }).then((posts) => {
    res.render('index', { posts })
  }).catch((err) => {
    console.log(err.message);
  });
});


module.exports = router;
