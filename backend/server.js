const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming requests with JSON payload
app.use(cors());
app.use(express.json());

// Use the todo routes for all `/api` endpoints
app.use('/api', todoRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

// Connect to the database
connectDB();

// Define the port to run the app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
