const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * POST /api/register
 * body: { name, email, password }
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // basic server-side validation
    if(!name || !email || !password){
      return res.status(400).json({ success:false, message: 'Name, email and password are required' });
    }
    if(password.length < 6){
      return res.status(400).json({ success:false, message: 'Password must be at least 6 characters' });
    }
    // check duplicate
    const existing = await User.findOne({ email: email.toLowerCase() });
    if(existing){
      return res.status(400).json({ success:false, message: 'Email already registered' });
    }
    // hash password
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashed
    });

    await user.save();

    // optionally return user id or minimal user info
    return res.status(201).json({ success:true, message: 'User registered successfully' });
  } catch (err) {
    console.error('register error:', err);
    // handle duplicate key error as fallback
    if(err.code === 11000 && err.keyPattern && err.keyPattern.email){
      return res.status(400).json({ success:false, message: 'Email already registered' });
    }
    return res.status(500).json({ success:false, message: 'Server error' });
  }
};

/**
 * GET /api/users
 * (simple admin listing)
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({createdAt: -1});
    return res.json({ success:true, users });
  } catch(err){
    console.error(err);
    return res.status(500).json({ success:false, message: 'Server error' });
  }
};

/**
 * GET /api/users/:id
 */
exports.getUserById = async (req, res) => {
  try {
    const u = await User.findById(req.params.id, '-password');
    if(!u) return res.status(404).json({ success:false, message: 'User not found' });
    return res.json({ success:true, user: u });
  } catch(err){
    console.error(err);
    return res.status(500).json({ success:false, message: 'Server error' });
  }
};

/**
 * DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    const u = await User.findByIdAndDelete(req.params.id);
    if(!u) return res.status(404).json({ success:false, message: 'User not found' });
    return res.json({ success:true, message: 'User deleted' });
  } catch(err){
    console.error(err);
    return res.status(500).json({ success:false, message: 'Server error' });
  }
};
