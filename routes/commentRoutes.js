import express from 'express';
import Comment from '../models/comment.js'; // Ensure the path is correct
const router = express.Router();

// POST request to add a new comment
router.post('/', async (req, res) => {
  const { username, commentText } = req.body;

  if (!username || !commentText) {
    return res.status(400).json({ message: 'Username and commentText are required' });
  }

  try {
    const newComment = new Comment({ username, commentText });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ message: 'Failed to submit comment' });
  }
});

// GET request to fetch all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

export default router;
