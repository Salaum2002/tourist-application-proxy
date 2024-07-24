import express from 'express';
import Comment from '../models/comment.js';

const router = express.Router();

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
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
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
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
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

export default router;
