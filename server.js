import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { PORT, MONGOOSE_URI, EMAIL_USER, EMAIL_PASS } from './config.js';
import User from './models/users.js';
import usersRoute from './routes/users.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
const httpServer = createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/user', usersRoute);
app.use('/api/comments', commentRoutes);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

const sendNewPasswordEmail = async (email, newPassword) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Password Recovery',
    text: `Your new password is: ${newPassword}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email);
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Password recovery endpoint
app.post('/api/user/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email address is required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    await sendNewPasswordEmail(user.email, newPassword);

    res.status(200).json({ message: 'A new password has been sent to your email address' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Error processing the request' });
  }
});

app.get('/ping', (req, res) => {
  res.json({ connected: true });
});

mongoose.connect(MONGOOSE_URI)
  .then(() => console.log('App connected to database'))
  .catch((error) => console.error('Database connection error:', error));

// Define the comments route
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments); // Ensure each comment object has 'username' and 'commentText'
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

httpServer.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
