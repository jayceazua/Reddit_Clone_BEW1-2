const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const comments = require('./comments');

// NEW
router.get('/new', (req, res, next) => {
  res.render('posts/new');
  console.log(req.originalMethod);
});

// READ a.k.a. SHOW
router.get('/:id', (req, res, next) => {
    // LOOK UP THE POST
    Post.findById(req.params.id).populate('comments').then((post) => {
      res.render('posts/show.hbs', { post })
    }).catch((err) => {
      console.log(err.message)
    })
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
  Post.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.redirect('/');
  }).catch((err) => {
    res.send(err.message);
  })
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


// Comments

router.use('/:id/comments', (req, res, next) => {
  req.postsId = req.params.id;
  next();
}, comments);

module.exports = router
