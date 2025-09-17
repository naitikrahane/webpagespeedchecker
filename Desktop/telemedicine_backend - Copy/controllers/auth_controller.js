// controllers/auth_controller.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt_config');

// Make sure each function is exported correctly
exports.registerUser = async (req, res) => {
    const { name, email, password, userType } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.createUser(name, email, hashedPassword, userType);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ message: 'Error registering user.' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: user.id, userType: user.user_type }, jwtConfig.secret, { expiresIn: '1h' });
        res.status(200).json({ token, userType: user.user_type });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Error logging in.' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, userType: user.user_type } });
    } catch (error) {
        console.error('Profile fetch failed:', error);
        res.status(500).json({ message: 'Error fetching profile.' });
    }
};