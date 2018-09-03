import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true},
  url: { type: String, required: true},
  summary: { type: String, required: true}
});

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;
