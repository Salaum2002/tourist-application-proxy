import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
