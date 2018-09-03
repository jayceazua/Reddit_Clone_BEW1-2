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
  console.log(req.method);
  // LOOK UP THE POST
  Post.findById(req.params.id).then((post) => {
    res.render('posts/show', { post });
  }).catch((err) => {
    console.log(err.message);
  });
});

// CREATE
router.post('', (req, res, next) => {
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

// UPDATE
router.get('/:id/edit', (req, res, next) => {
  console.log(req.originalMethod);
  Post.findById(req.params.id).then((post) => {
    res.render('posts/edit', { post });
  }).catch((err) => {
    console.log(err.message);
  });
});

router.put('/:id', (req, res, next) => {
  console.log('Post was updated.');
});
// DELETE
router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  });
});

module.exports = router
