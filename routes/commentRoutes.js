import express from "express";
import { postComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

// POST endpoint to create a new comment
router.post("/comments", postComment);

// GET endpoint to retrieve all comments
router.get("/comments", getComments);

export default router;
