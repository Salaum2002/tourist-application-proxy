import express from 'express';
import Comment from '../models/comment.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments); // Ensure each comment object has 'userName' and 'commentText'
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

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
    res.status(500).json({ message: 'Error saving comment' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { commentText } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { commentText },
      { new: true }
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Comment.findByIdAndDelete(id);
    res.status(204).end(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

export default router;
