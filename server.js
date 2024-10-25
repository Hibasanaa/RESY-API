// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.error('MongoDB connection error:', err));

// Home route (just to confirm server is running)
app.get('/', (req, res) => {
   res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
const User = require('./models/User');
app.get('/users', async (req, res) => {
    try {
       const users = await User.find();
       res.json(users);
    } catch (err) {
       res.status(500).json({ message: err.message });
    }
 });
 app.post('/users', async (req, res) => {
    const user = new User({
       name: req.body.name,
       email: req.body.email,
       age: req.body.age
    });
 
    try {
       const newUser = await user.save();
       res.status(201).json(newUser);
    } catch (err) {
       res.status(400).json({ message: err.message });
    }
 });
 app.put('/users/:id', async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
       if (!user) return res.status(404).json({ message: 'User not found' });
 
       user.name = req.body.name || user.name;
       user.email = req.body.email || user.email;
       user.age = req.body.age || user.age;
 
       const updatedUser = await user.save();
       res.json(updatedUser);
    } catch (err) {
       res.status(400).json({ message: err.message });
    }
 });
 app.delete('/users/:id', async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
       if (!user) return res.status(404).json({ message: 'User not found' });
 
       await user.remove();
       res.json({ message: 'User deleted' });
    } catch (err) {
       res.status(500).json({ message: err.message });
    }
 });
 