const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Regular expression for validating email format
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  try {
    // Check if email format is valid
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // Validate name and password length
    if (name.length < 3) {
      return res.status(400).json({ message: "Name must be at least 3 characters long!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long!" });
    }

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Hash the user's password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Email: " + email);
  console.log("Password: " + password);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    // Include role in the JWT payload
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude the password field
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit user profile
exports.editProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const updates = { name, email };

    // Handle avatar upload
    if (req.file) {
      const user = await User.findById(req.userId);
      if (user.avatar) {
        // Delete the old avatar file
        fs.unlink(user.avatar, (err) => {
          if (err) console.error("Failed to delete old avatar:", err);
        });
      }
      updates.avatar = req.file.path; // Add new avatar path to updates
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: "User not found!" });

    res.json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const user = await User.findById(req.userId);
    if (user.avatar) {
      // Delete the old avatar file
      fs.unlink(user.avatar, (err) => {
        if (err) console.error("Failed to delete old avatar:", err);
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { avatar: req.file.path },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found!" });

    res.json({ message: "Avatar uploaded successfully!", avatar: updatedUser.avatar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body; // New role passed in the request body

    // Validate role field
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ error: "Invalid role specified. Allowed roles are 'admin' and 'user'." });
    }

    // Find and update the user's role
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password'); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User role updated successfully!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
