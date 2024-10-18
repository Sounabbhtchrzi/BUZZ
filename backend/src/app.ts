import dotenv from 'dotenv'; // Import dotenv
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './db/db';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error: Error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  });
