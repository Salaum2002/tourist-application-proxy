import express from "express";
import { login, getUser, signup } from "../controller/users.js";
const app = express();

app.post("/login", login);
app.post("/get/:id", getUser);
app.post("/signup", signup);

export default app;
