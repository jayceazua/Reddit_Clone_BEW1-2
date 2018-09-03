const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// NEW
router.get('/new', (req, res, next) => {
  res.render('posts/new');
});

// CREATE
router.post('/new', (req, res, next) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  let post = new Post(req.body);
  // SAVE INSTANCE OF POST MODEL TO DB
  post.save().then((post) => {
    return res.redirect('/');
    console.log('Success!');
  }).catch((err) => {
    return res.redirect('/');
    console.log(err.message);
  });
});

// READ a.k.a. SHOW
router.get('/:id', (req, res, next) => {
  // LOOK UP THE POST
  Post.findById(req.params.id).then((post) => {
    res.render('posts/show', { post });
  }).catch((err) => {
    console.log(err.message);
  });
});

// UPDATE

// DELETE

module.exports = router
