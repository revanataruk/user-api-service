const { User } = require('../models'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: { id: newUser.id, fullName: newUser.fullName, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


exports.getUserData = async (req, res) => {
  const userId = req.user.id; 
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'fullName', 'email', 'status'] 
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  const userIdToDelete = req.params.id;
  const loggedInUserId = req.user.id;

  if (parseInt(userIdToDelete) !== loggedInUserId) {
    return res.status(403).json({ message: 'Forbidden: You can only delete your own account.' });
  }

  try {
    const user = await User.findByPk(userIdToDelete);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();

    res.status(200).json({ message: 'User successfully soft-deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.id;
    const loggedInUserId = req.user.id;
    const { fullName } = req.body;

    if (parseInt(userIdToUpdate) !== loggedInUserId) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own data.' });
    }

    const user = await User.findByPk(userIdToUpdate);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = fullName;
    await user.save(); 

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

exports.setUserStatus = async (req, res) => {
  try {
    const { status } = req.body; 

    if (status !== 'Active' && status !== 'Inactive') {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = status;
    await user.save();

    res.status(200).json({ message: `User status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error: error.message });
  }
};