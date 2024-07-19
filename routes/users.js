import express from "express";
import { login, getUser, signup } from "../controller/users.js";
const router = express.Router();

router.post("/login", login);
router.get("/user", getUser);  // Use GET for retrieving users
router.post("/signup", signup);

export default router;
