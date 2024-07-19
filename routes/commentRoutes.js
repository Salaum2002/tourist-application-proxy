import express from 'express';
import { postComment, getComments } from '../controller/commentController.js';

const router = express.Router();

router.post('/comment', postComment);
router.get('/comments', getComments);

export default router;
