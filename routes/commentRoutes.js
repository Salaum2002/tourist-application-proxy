import express from 'express';
import { postComment, getComments } from '../controllers/comments.js';

const router = express.Router();

router.post('/', postComment); // Route to post a comment
router.get('/', getComments);  // Route to get all comments

export default router;
