import express from 'express';
import Comment from '../models/comment.js';

const router = express.Router();

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  const { userName, commentText } = req.body;

  if (!userName || !commentText) {
    return res.status(400).json({ message: 'Username and comment text are required' });
  }

  try {
    const newComment = new Comment({ userName, commentText });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error creating comment:', error.message);
    res.status(500).json({ message: 'Error creating comment' });
  }
});

// PUT to update a comment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { commentText } = req.body;

  if (!commentText) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { commentText }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error.message);
    res.status(500).json({ message: 'Error updating comment' });
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

export default router;
