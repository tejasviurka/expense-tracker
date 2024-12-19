const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config(); 


// Initialize the app AFTER loading dependencies
const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes AFTER app initialization
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
// connectDB(); // Call the function to connect to the database

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
