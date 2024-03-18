// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'YOUR_MONGODB_CONNECTION_STRING' with your actual connection string)
mongoose.connect('mongodb+srv://kukuhwicaksono105xb:gQf9i4rYHJPyyTvM@cluster0.9rjimzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose model for your users
const User = mongoose.model('User', {
  id: String,
  username: String,
  phonenumber: String,
  email: String,
  address: String,
});

// API endpoint to get users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to update a user
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, phonenumber, email, address } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { id },
      { username, phonenumber, email, address },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to delete a user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.deleteOne({ id });
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
