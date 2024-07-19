import express from 'express';
import { postComment, getComments } from '../controllers/comments.js';

const router = express.Router();

router.post('/', postComment);
router.get('/', getComments);

export default router;
