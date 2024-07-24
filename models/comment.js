import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  commentText: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
