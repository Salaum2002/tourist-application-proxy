import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGOOSE_URI } from './config.js';
import cors from 'cors';
import { createServer } from 'http';
import usersRoute from './routes/users.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
const httpServer = createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/user', usersRoute);
app.use('/api/comments', commentRoutes); // Updated route

httpServer.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

app.get('/ping', (req, res) => {
  res.json({ connected: true });
});

mongoose
  .connect(MONGOOSE_URI)
  .then(() => {
    console.log('App connected to database');
  })
  .catch((error) => {
    console.log(error);
  });
