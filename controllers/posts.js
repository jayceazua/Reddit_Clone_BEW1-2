const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// NEW
router.get('/new', (req, res, next) => {
  res.render('posts/new');
  console.log(req.originalMethod);
});

// READ a.k.a. SHOW
router.get('/:id', (req, res, next) => {
  // LOOK UP THE POST
  Post.findById(req.params.id).then((post) => {
    return res.render('posts/show', { post });
  }).catch((err) => {
    console.log(err.message);
    return res.redirect('/');
  });
});

// CREATE
router.post('', (req, res, next) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  let post = new Post(req.body);
  // SAVE INSTANCE OF POST MODEL TO DB
  post.save().then(() => {
    return res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
    return res.redirect('/');
  });
});

// UPDATE - GET
router.get('/:id/edit', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    return res.render('posts/edit', { post });
  }).catch((err) => {
    console.log(err.message);
    return res.redirect('/');
  });
});

// UPDATE
router.put('/:id', (req, res, next) => {
  /**
  TODO: need to properly set the UPDATE endpoint.
  **/
});

// DELETE
router.delete('/:id', (req, res, next) => {
  Post.findByIdAndRemove(req.params.id).then(() => {
    return res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
    return res.redirect('/');
  });
});

module.exports = router
