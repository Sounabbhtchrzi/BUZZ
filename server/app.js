import dotenv from 'dotenv'; // Import dotenv
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './db/db.js';  // Note the .js extension
import postRoutes from './routes/postRoutes.js';
import cookieMiddleware from './middleware/cookieMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Update this to your frontend's URL
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use(cookieMiddleware);
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  });
