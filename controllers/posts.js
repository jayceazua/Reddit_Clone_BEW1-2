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
/**
TODO:
When "updating" a certain field the rest of the fields that were not updated
  the current post with blanks.
**/
router.put('/:id', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    console.log(post.title)
    console.log(post.url)
    console.log(post.summary)
    console.log(post.__v)

    console.log('---- New post ----')
    let title = req.body.title === '' ? post.title : req.body.title;
    let url = req.body.url === '' ? post.url : req.body.url;
    let summary = req.body.summary === '' ? post.summary : req.body.summary;
    let __v = post.__v + 1;
    
    // Post.updateOne(req.body).then((post) => {
    //   return res.redirect('/')
    // }).catch((err) => {console.log(err.message)});
return res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
    return res.redirect('/');
  });
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
