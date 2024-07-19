import express from 'express';
import { postComment, getComments } from '../controllers/comments.js';

const router = express.Router();

// Route to post a comment
router.post('/', postComment);

// Route to get all comments
router.get('/', getComments);

export default router;
