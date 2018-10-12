const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	createdAt: {type: Date},
	updatedAt: {type: Date},
	title: { type: String, required: true },
  subreddit: { type: String, required: false },
	url: { type: String, required: true },
	summary: { type: String, required: true },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

// Don't use arrow syntax when using this key word
PostSchema.pre('save', function(next) {
	// SET createdAt AND updatedAt
	const now = new Date();
	this.updatedAt = now;

	if (!this.createdAt) {
		this.createdAt = now;
	}
	// Jumps to the next middleware
	next();
});

module.exports = mongoose.model('Post', PostSchema);
