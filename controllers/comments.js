const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/post');
const router = require('express').Router();


// CREATE
router.post('', (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body)
    // SAVE INSTANCE OF Comment MODEL TO DB
    comment.save().then((comment) => {
      return Post.findById(req.postsId)
    })
    .then((post) => {
      post.comments.unshift(comment)
      return post.save()
    })
    .then((post) => {
      res.redirect(`/`)
    }).catch((err) => {
      console.log(err)
    })
});

// UPDATE
// DELETE

module.exports = router;
