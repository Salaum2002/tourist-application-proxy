import express from 'express';
import { postComment, getComments } from '../controller/comments.js';

const router = express.Router();

router.post('/', postComment);
router.get('/', getComments);

export default router;
