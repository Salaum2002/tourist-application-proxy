import express from 'express';
import { postComment, getComments } from '../controller/comments.js'; // Adjust path if necessary

const router = express.Router();

router.post('/', postComment);
router.get('/', getComments);

export default router;
