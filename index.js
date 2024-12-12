const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Apply CORS middleware
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/cyberrotutorial'; // Update this as needed
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schema and Model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// POST Endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const newUser = new User({ email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
