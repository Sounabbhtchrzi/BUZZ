import dotenv from 'dotenv'; // Import dotenv
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './db/db';
dotenv.config();
import postRoutes from './routes/postRoutes';
import cookieMiddleware from './middleware/cookieMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: `${process.env.VITE_FRONTEND_URL}`, // Update this to your frontend's URL
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.use(cookieParser()); 
app.use(cookieMiddleware); 
app.use(cookieParser());
app.use(express.json());

// routes
app.use('/api/posts', postRoutes);

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
