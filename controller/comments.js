import express from 'express';
import Comment from '../models/comment.js'; // Adjust the path if necessary

const router = express.Router();

// Route to fetch all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }); // Fetch and sort comments by creation date (newest first)
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

// Route to post a new comment
router.post('/', async (req, res) => {
  const { username, commentText } = req.body;

  if (!username || !commentText) {
    return res.status(400).json({ message: 'Username and comment text are required' });
  }

  try {
    const newComment = new Comment({ username, commentText });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'Failed to post comment' });
  }
});

// Route to update a comment by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { commentText } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { commentText }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Failed to update comment' });
  }
});

// Route to delete a comment by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
});

export default router;
