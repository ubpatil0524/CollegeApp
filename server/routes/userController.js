const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../middleware/authMiddleware');
const User = require('../models/userModel');


router.post('/register', async (req, res) => {
  try {    
    const { 
            firstName,
            lastName,
            gender,
            phoneNo,
            email,
            password,
            confirmPassword 
          } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      gender,
      phoneNo,
      email,
      password: hashedPassword,
      confirmPassword
    });

    const savedUser = await user.save();
    res.status(201).json({ message: 'Registration successful', user: savedUser });
    console.log(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const accessToken = generateAccessToken(user);
    
    res.json({ message: 'Login successful', accessToken,user:user });
    console.log({ message: 'Login successful', accessToken,user:user });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'Login failed' });
  }
});





router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user' });
  }
});



router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});


module.exports = router;
