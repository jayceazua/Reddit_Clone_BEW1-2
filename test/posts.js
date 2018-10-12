const chai = require('chai');
const chaiHttp = require('chai-http');
const Post = require('../models/posts'); // Import post model
const should = chai.should();

chai.use(chaiHttp);

describe('Posts', () => {
  it('should create with valid attributes at POST /posts', (done) => {

    let post = {title: "Test Post Title", url: "https://www.google.com", summary: "Test Post Summary"};


    Post.findOneAndRemove(post, () => {
      Post.find((err, posts) => {
        let postCount = posts.count;

        chai.request('localhost:3000')
          .post('/posts/new', post)
          .end((err, res) => {

            // Check that the database has one more post in it
            // Check that the response is successful
            Post.find((err, posts) => {
              postCount.should.be.equal(posts.count + 1);
              res.should.have.status(200);
              done();  // ends anything that is async
          });
      });
    });
  });
})
