import express from 'express';
import Comment from '../models/comments.js';

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments' });
  }
});

// Post a new comment
router.post('/', async (req, res) => {
  const { userName, commentText } = req.body;
  const newComment = new Comment({ userName, commentText });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error saving comment' });
  }
});

// Edit a comment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { commentText } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { commentText }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

export default router;
