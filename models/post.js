const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  createdAt:  { type: Date },
  updatedAt:  { type: Date },
  title:      { type: String, required: true },
  url:        { type: String, required: true },
  summary:    { type: String, required: true },
  category: [{ type: String, required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.pre('save', (next) => {
  // SET createdAt AND updatedAt
  const now = new Date()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  };
  next();
});

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;
